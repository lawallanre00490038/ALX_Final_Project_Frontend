"use client"

import { formatCurrency } from "@/utils/Getter"
import { handleAddToCart } from "@/utils/handleCart"
import Image from "next/image"
import { useState } from "react"

type detailsFormProps = {
  product: {
    id: string
    imagePath: string
    name: string
    priceInNaira: number
    description: string
  }
}


export function DetailsForm({ product }: detailsFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8 pt-[100px] md:pt-[150px] px-4">
      <div className="flex gap-4 items-center md:flex-row flex-col mt-4 md:">
        <div className="flex-shrink-0 relative">
          <Image
            src={product.imagePath}
            width={300}
            height={300}
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="flex justify-center md:justify-between w-full md:w-2/3 p-2">
          <div>
            <div className="text-lg">
              {formatCurrency(product.priceInNaira * quantity)}
            </div>
            <h1 className="text-md font-bold">{product.name}</h1>
            <div className="max-w-[150px] break-words">
              {product.description}
            </div>
          </div>

          {/* create a vertical line to separate the product details and the purchase details */}
          <div className="border-r border-gray-300 h-auto mx-2"></div>
          
          {/* Increase the number of purcahses by adding a quantity input field */}
          <div className="flex space-x-2 items-center justify-center self-start p-2">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              max="10"
              onChange={(e) => setQuantity(+e.target.value)}
              defaultValue={quantity}
              className="p-2 md:p-4 border border-gray-300 rounded-lg"
            />
        </div>
        </div>
        <button className="bg-primary text-white border-primary rounded-full flex justify-center items-center p-3 hover:bg-purple-950"
        onClick={() => handleAddToCart(id, 1, cart, addToCart)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
