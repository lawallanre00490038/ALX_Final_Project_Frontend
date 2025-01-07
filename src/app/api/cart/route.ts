import { NextResponse } from 'next/server';
import db from '@/db/db';

// Add item to cart
export async function POST(req: Request) {
  const { productId, userId } = await req.json();

  // Check if the product is already in the cart
  const existingCartItem = await db.cart.findFirst({
    where: { productId, userId },
  });

  if (existingCartItem) {
    // Increase the quantity
    const updatedItem = await db.cart.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
    return NextResponse.json(updatedItem);
  }

  // Add new item to the cart
  const newCartItem = await db.cart.create({
    data: {
      productId,
      userId,
      quantity: 1,
    },
  });

  return NextResponse.json(newCartItem);
}

// Get cart items for a user
export async function GET(req: Request) {
  const userId = req.headers.get('user-id'); // Pass the user ID in headers or session
  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

  const cartItems = await db.cart.findMany({
    where: { userId },
    include: { product: true }, // Include product details
  });

  return NextResponse.json(cartItems);
}

// Remove item from cart
export async function DELETE(req: Request) {
  const { cartId } = await req.json();
  await db.cart.delete({ where: { id: cartId } });

  return NextResponse.json({ message: 'Item removed from cart' });
}

// Update quantity
export async function PUT(req: Request) {
  const { cartId, quantity } = await req.json();

  const updatedCart = await db.cart.update({
    where: { id: cartId },
    data: { quantity },
  });

  return NextResponse.json(updatedCart);
}
