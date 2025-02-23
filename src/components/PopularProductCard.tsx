"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "@/types/TypesProps";
import { formatCurrency } from "@/utils/Getter";
import { useCart } from "@/context/CartContext";
import { handleAddToCart } from "@/utils/handleCart";

const PopularProductCard = ({ id, imagePath, name, priceInNaira, description }: ProductCardProps) => {
  const { cart, addToCart } = useCart();

  return (
    <div className="flex flex-1 flex-col w-full max-sm:w-full">
      <h3 className="mt-2 text-xl leading-normal font-semibold font-palanquin">{name}</h3>

      <Link href={`/products/${id}/details`}>
        <Image
          src={imagePath}
          alt={name}
          width={300}
          height={300}
          className="object-cover rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out w-[300px] h-[300px]"
        />
        <p className="text-sm py-2 leading-normal font-semibold font-palanquin">{description}</p>
      </Link>
      <div className="flex justify-between items-center">
        <p className="font-semibold font-montserrat text-gray-900 text-sm leading-normal">
          {formatCurrency(priceInNaira)}
        </p>

        
        <button className="bg-primary text-white border-primary rounded-full flex justify-center items-center p-3 hover:bg-purple-950"
         onClick={() => handleAddToCart(cart, addToCart, imagePath, id )}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopularProductCard;





export const PopularProductCardSkeleton = () => {
  return (
    <div  className="flex flex-1 flex-col w-full max-sm:w-full animate-pulse">
      <h3 className="mt-2 text-xl leading-normal font-semibold font-palanquin">
        <div className="w-20 h-4 bg-gray-300 rounded-full mb-4"></div>
      </h3>
      <div className="w-300 h-300 bg-gray-300 rounded-lg aspect-video"></div>
      <p className="text-xl leading-normal font-semibold font-palanquin">
        <p className="w-20 h-4 bg-gray-300 rounded-full mt-4"></p>
      </p>
      <p className="font-semibold font-montserrat text-gray-900 text-sm leading-normal">
        <p className="w-20 h-4 bg-gray-300 rounded-full mt-4"></p>
      </p>
    </div>
  );
};


