'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { formatCurrency } from "@/utils/Getter";
import Link from 'next/link';
import '@/app/css/Cart.css';
import '@/app/css/Details.css';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, total } = useCart();
  
  useEffect(() => {
    getTotal();
  }, [cart, getTotal]); // Recalculate total whenever cart changes

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Nothing in Cart</h2>;
  }

  return (
    <>
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
            <div className="amount">
              <button className="count" onClick={() => updateQuantity(item.id, item.quantity - 1)}> - </button>
              <span>{item.quantity}</span>
              <button className="count" onClick={() => updateQuantity(item.id, item.quantity + 1)}> + </button>
            </div>
          </div>
          <div className="delete mr-8 md:mt-6 hover:cursor-pointer text-2xl" onClick={() => removeFromCart(item.id)}>X</div>
        </div>
      ))}

      
      <div className="total">
        <Link href="/payment">Payment</Link>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
    </>
  );
};

export default Cart;
