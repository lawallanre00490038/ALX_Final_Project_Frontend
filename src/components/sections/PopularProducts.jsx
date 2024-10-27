import { Suspense, useEffect, useState } from "react";
import PopularProductCard, { PopularProductCardSkeleton } from "@/components/PopularProductCard";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { getAllData } from "@/app/actions/GetData";

const PopularProducts = () => {

  const [products, setProducts] = useState([]); // List of products
  const [page, setPage] = useState(1);

  // Loading state
  const fetchProducts = async (page) => {
    const response = await getAllData();
    setProducts(response);
  };

  const HandleFilter = async (category) => {
    console.log(category);
    const products = category === "All" ? await getAllData() : await getAllData(category);
    // const filteredProducts = category === "All" ? products : products.filter((product) => product.category === category);
    setProducts(products);
  }

  useEffect(() => {
    fetchProducts(page);
  }, [page]);


  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-purple-900">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value.
        </p>
      </div>

      {/* Filter Section */}
      <div>
        <h4 className="text-center p-4 text-slate-gray font-montserrat">
          Filter by Category
        </h4>

        <div className="flex justify-center">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <li className="p-4 bg-primary min-w-[120px] text-center cursor-pointer active:bg-purple-900 active:text-purple-100 transition-all duration-300" onClick={() => HandleFilter("All")}>
              All
            </li>
            <li className="p-4 bg-primary min-w-[120px] text-center cursor-pointer active:bg-purple-900 active:text-purple-100 transition-all duration-300" onClick={() => HandleFilter("ANKARA")}>
              Ankara
            </li>
            <li className="p-4 bg-primary min-w-[120px] text-center cursor-pointer active:bg-purple-900 active:text-purple-100 transition-all duration-300" onClick={() => HandleFilter("JEWELRY")}>
              Jewelry
            </li>
            <li className="p-4 bg-primary min-w-[120px] text-center cursor-pointer active:bg-purple-900 active:text-purple-100 transition-all duration-300"onClick={() => HandleFilter("READY_TO_WEAR")}>
              Ready to Wear
            </li>
            <li className="p-4 bg-primary min-w-[120px] text-center cursor-pointer active:bg-purple-900 active:text-purple-100 transition-all duration-300 md:col-start-2 md:col-span-2">
              Adire T.shirt and Fabrics
            </li>
          </ul>
        </div>
      </div>


      {/* Product Grid */}
      <TrackVisibility partialVisibility once className="clear-both">
        {({ isVisible }) => (
          <div
            className={`mt-4 md:mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-7 md:gap-14 ${
              isVisible ? "animate__animated animate__fadeIn animate__slow" : ""
            }`}
          >
            <Suspense 
              fallback={
                <>
                  <ProductSuspenseSkeleton  products={products}/>
                </>
              }
            >
              <ProductSuspense products={products} />
            </Suspense>
          </div>
        )}
      </TrackVisibility>

      {/* {page < totalPages && (
        <div className="text-center mt-8">
          <button
            className="bg-purple-900 text-purple-100 font-bold text-lg py-2 px-4 rounded hover:bg-purple-700"
            onClick={loadMoreProducts}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )} */}
    </section>
  );
};

export default PopularProducts;







const ProductSuspense = async({ products }) => {
  return (
    <>
      {products.map((product) => (
        <PopularProductCard key={product.id} {...product} />
      ))}
    </>
  );
}


const ProductSuspenseSkeleton = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <PopularProductCardSkeleton key={product.id} />
      ))}
    </>
  );
}