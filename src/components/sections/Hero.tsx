"use client";

import { statistics } from "../../assets/constants";
import { arrowRight } from "../../assets/icons";
import Button from "../Button";
import ShoeCard from "../HeroDressCard";
import {  useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHeroProducts } from "@/app/actions/GetData";
import { ProductCardProps } from "@/types/TypesProps";

const Hero = () => {
  const [bigDressImg, setBigDressImg] = useState("");
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  // Loading state
  const fetchProducts = async () => {
    let response = await getHeroProducts();
    const res = response[0].imagePath;
    setBigDressImg(res);
    setProducts(response as any);
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-36">
        <p className="text-xl text-purple-900">
          Our Summer Collection
        </p>
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[68px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 xl:pr-10 max-sm::p-0">
            New Collection
          </span>
          <br />
          <span className="text-purple-900 inline-block mt-3">
            MoAdunni{" "}
          </span>{" "}
        </h1>
        <p className="text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover stylish Converse arrivals, quality comfort, and innovation
          for your active life.
        </p>
        <Button 
          label="Shop now" 
          iconURL={arrowRight} 
          backgroundColor="bg-purple-500"
          textColor="text-white"        
          borderColor="border-blue-500" 
          fullWidth={false}
          classname=""        
        />
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.value}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="font-montserrat leading-7 text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:pb-24 bg-primary bg-hero bg-cover bg-center">
        <Image
          src={bigDressImg}
          alt="shoe collection"
          height={300}
          width={300}
          id="hero-image"
          className="object-contain relative z-10 md:w-[500px] h-[500px]"
        />
        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6 items-center justify-center">
          {products.map((dress, index) => (
            <Link href={`#hero-image`} key={index}>
              <ShoeCard
                imgURL={dress}
                changeBigDressmage={(dress: any) => setBigDressImg(dress)}
                bigDressImg={bigDressImg}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
