'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { formatCurrency } from "@/utils/Getter";
import Link from 'next/link';
import '@/app/css/Cart.css';
import '@/app/css/Details.css';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useSession } from 'next-auth/react';


const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, total } = useCart();
  const { data: session } = useSession();

  const config = {
    public_key: 'FLWPUBK_TEST-16bc6cf4fb120eb416e4994b7708f33f-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email:  session?.user?.email || 'user@gmail.com',
      phone_number: '070********',
      name: session?.user?.name || 'John Doe',
    },
    customizations: {
      title: `Items: ${cart.map((item) => item.product.name).join(', ')}`,
      description: `Payment for items: ${cart
      .map(
        (item) =>
          `${item.product.name} (x${item.quantity}) - ${formatCurrency(
            item.product.priceInNaira * item.quantity
          )}`
      )
      .join('\n')}`,
      logo: '/frontImg.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response : any) => {
      if (response.status !== 'completed') {
        console.log('Failed Transaction');
      }else {
        console.log('Payment Succeful');
      }
      closePaymentModal()
    },
    onClose: () => {},
    tx_ref: Date.now().toString(),
  };


  
  useEffect(() => {
    getTotal();
  }, [cart, getTotal]); // Recalculate total whenever cart changes

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Nothing in Cart</h2>;
  }

  return (
    <>
      <div className='mt-[100px]'>
      {cart.map((item) => (
        <div key={item.id} className="details cart flex items-center relative">
          <Image src={item.product.imagePath} alt={item.product.name} width={300} height={300} />
          <div className="box">
            <div className="row">
              <h2>{item.product.name}</h2>
              <span>{formatCurrency(item.product.priceInNaira * item.quantity)}</span>
            </div>
            {/* <Colors colors={item.product.colors} /> */}
            <p>{item.product.description}</p>
            <p>{item.product.name}</p>
            <div className="amount mb-4">
              <button className="count" onClick={() => updateQuantity(item.id, item.quantity - 1)}> - </button>
              <span>{item.quantity}</span>
              <button className="count" onClick={() => updateQuantity(item.id, item.quantity + 1)}> + </button>
            </div>
            <div className="inline delete mt-10 p-2 hover:cursor-pointer text-sm bg-red-500 text-white rounded-lg hover:bg-red-800" 
            onClick={() => removeFromCart(item.id)}>Remove</div>
          </div>
         
        </div>
      ))}
      </div>

      
      <div className="total flex justify-between flex-col items-center gap-4 md:flex-row mt-4">
        <button
          className='bg-slate-500 md:p-4 p-2 rounded-lg text-white hover:bg-slate-700'
          type='submit'
          title="Pay with Flutterwave"
        >
          <span className="sr-only text-sm">Pay with Flutterwave</span>
          {session ? <FlutterWaveButton {...fwConfig} /> : <Link href="/login">Login to pay</Link>}
        </button>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
    </>
  );
};

export default Cart;
