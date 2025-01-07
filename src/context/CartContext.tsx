'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInNaira: number;
    description: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (cartId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartId: string) => Promise<void>;
  getTotal: () => void; // Function to calculate the total
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0); // Total state to store the cart's total price

  // Fetch cart items from the API
  const fetchCart = async () => {
    const response = await fetch('/api/cart', {
      headers: { 'user-id': 'user123' }, // Replace with actual user ID from session/auth
    });
    const data = await response.json();
    setCart(data);
  };

  // Calculate the total price of the cart
  const getTotal = () => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.product.priceInNaira * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // Add item to cart
  const addToCart = async (productId: string) => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId: 'user123' }),
    });
    await fetchCart();
  };

  // Update item quantity
  const updateQuantity = async (cartId: string, quantity: number) => {
    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, quantity }),
    });
    await fetchCart();
  };

  // Remove item from cart
  const removeFromCart = async (cartId: string) => {
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId }),
    });
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Recalculate total whenever the cart changes
  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
