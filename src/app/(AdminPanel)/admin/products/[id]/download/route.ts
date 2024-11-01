import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id }}: {params: {id: string}} ) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      filePath: true,
      name: true,
    }
  });
  if (product == null) {
    return notFound();
  }
 
  if (!product.filePath) {
    return notFound();
  }

  const fs = require('fs');
  const {size} = fs.statc(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split(".").pop();
  
  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filenamee=${product.name}.${extension}`,
      "Content-Length": size.toString(),
    }
  });
}