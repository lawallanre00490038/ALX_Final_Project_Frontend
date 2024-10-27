"use client";

import Button from "@/components/Button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/Getter";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";
import { getAllProducts } from "../_actions/products";
import { useEffect, useState } from "react";
import { Product } from "@/types/TypesProps";


export default function AdminProductsPage() {

   // // Use the Product type in useState
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
     const fetchData = async () => {
       const data = await getAllProducts();
       setProducts(data);
     };
 
     fetchData();
   }, []);

   console.log(products);
   // const products: Product[] = await getAllProducts(); // Await the promise

 if (products.length === 0) {
   console.log("No products found")
   return <div className="p-10 text-center">No products found</div>
 }


  return (
    <>
    <div className="flex justify-between items-center gap-4 p-10">
      <PageHeader>Products</PageHeader>
      <Link href={`/admin/products/new`}>
        <Button 
          label="Add Product" 
          iconURL="" 
          backgroundColor="purple" 
          textColor="black" 
          borderColor="purple" 
          fullWidth={false} 
          classname=""
        />
      </Link>
    </div>
    <ProductTable products={products}/>
    </>
  );
}


const ProductTable = ({products}: {products: Product[]})=> {

  
  return <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-8">
          <span className="sr-only">Available for Purchase</span>
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Orders</TableHead>
        <TableHead>Category</TableHead>
        <TableHead className="w-8">
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell className="text-center">
            {product.isAvailableForPurchase ? 
            (
              <>
                <CheckCircle2 />
              </>
            ) : 
            (
              <>
                <XCircle />
              </>
            )
          }
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{formatCurrency(product.priceInNaira)}</TableCell>
          <TableCell>{formatNumber(product._count.orders)}</TableCell>
          <TableCell>{product.category}</TableCell>
          <TableCell className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="cursor-pointer"/>
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-2 justify-center bg-primary p-2">
                <DropdownMenuItem asChild className="p-2">
                  <a download href={`/admin/products/${product.id}/download`}>
                    Download
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild  className="p-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <ActiveToggleDropdownItem id={product.id}  isAvailableForPurchase={product.isAvailableForPurchase} />
                <DropdownMenuSeparator />
                <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}