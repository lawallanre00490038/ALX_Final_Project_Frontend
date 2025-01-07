import PopularProductCard, { PopularProductCardSkeleton } from "../PopularProductCard";




export const ProductSuspense = ({ products }: any) => {
  return (
    <>
      {products.map((product: any, index: any) => (
        <PopularProductCard key={index} {...product} />
      ))}
    </>
  );
}


export const ProductSuspenseSkeleton = ({ products }: any) => {
  return (
    <>
      {products.map((product: any) => (
        <PopularProductCardSkeleton key={product.id} />
      ))}
    </>
  );
}