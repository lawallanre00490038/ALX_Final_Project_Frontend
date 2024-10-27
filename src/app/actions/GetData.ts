"use server";

import db from "@/db/db"
import { cache } from "@/lib/cache";
import { ProductCategory } from "@prisma/client";



export const getAllData = cache(
  async (category?: string) => {
    const data = await db.product.findMany({
      select: {
        id: true,
        name: true,
        priceInNaira: true,
        isAvailableForPurchase: true,
        category: true,
        imagePath: true,
        description: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
      orderBy: { name: "desc" },
      where: {
        isAvailableForPurchase: true,
        ...(category && { category: category as ProductCategory }),
      },
    });
    console.log(data);
    console.log("category", data.length);
    return data;
  },
  ["/", "getAllData"],
  { revalidate: 60 * 60 * 24 }
);



export const getHeroProducts = cache(
  async () => {
    return await db.product.findMany({
      select: {
        id: true,
        name: true,
        priceInNaira: true,
        isAvailableForPurchase: true,
        category: true,
        imagePath: true,
        description: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: { createdAt: "desc" }, // Order from newest to oldest
      take: 3, // Limit to the latest 3 products
    });
  },
  ["getHeroProducts"], 
  { revalidate: 60 * 60 * 24 } 
);


