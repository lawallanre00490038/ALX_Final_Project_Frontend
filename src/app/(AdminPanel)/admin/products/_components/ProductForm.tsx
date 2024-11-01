"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/utils/Getter"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )
  const [priceInNaira, setpriceInNaira] = useState<number | undefined>(
    product?.priceInNaira
  )

  // const HandSubmit = (fornData: FormData) => {
  //   console.log(fornData.get("file"))
  // }

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      
      {/* Select Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          required
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          defaultValue={product?.category || ""}
        >
          <option value="">Select a category</option>
          <option value="ANKARA">Ankara</option>
          <option value="JEWELRY">Jewelry</option>
          <option value="READY_TO_WEAR">Ready to Wear</option>
        </select>
        {error.category && <div className="text-destructive">{error.category}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInNaira">Price In Naira</Label>
        <Input
          type="number"
          id="priceInNaira"
          name="priceInNaira"
          required
          value={priceInNaira}
          onChange={e => setpriceInNaira(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInNaira || 0))}
        </div>
        {error.priceInNaira && (
          <div className="text-destructive">{error.priceInNaira}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div> */}
      
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}