import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  // Convert price from Naira to Kobo for Stripe (1 Naira = 100 Kobo)
  const nairaToDollarRate = 1 / 1650; // Conversion rate from Naira to USD
  const converter = nairaToDollarRate * 100;
  
  let amountInCents = Math.round(product.priceInNaira * converter);

  // Ensure minimum amount of 37 cents for Stripe (30 pence)
  const minimumCents = 37;
  if (amountInCents < minimumCents) {
    amountInCents = minimumCents;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
