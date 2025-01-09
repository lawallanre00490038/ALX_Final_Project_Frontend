import db from "@/db/db";
import { notFound } from "next/navigation";
import {DetailsForm} from "./_components/DetailsForm";

export default async function ProductDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  console.log( product);
  if (product == null) return notFound();


  return (
    <DetailsForm
      product={product}
    />
  );
}
