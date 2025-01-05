"use client";

import { statistics } from "../../assets/constants";
import { arrowRight } from "../../assets/icons";
import Button from "../Button";
import HeroDressCard from "../HeroDressCard";
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
    console.log("Hero Images", response);
    
    // const res = response[0].imagePath;
    const res = '/frontimg.jpg';
    setBigDressImg(res);
    console.log("Hero Bigimage", response[0].imagePath);
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
        {/* <p className="text-xl text-purple-900">
          Our Summer Collection
        </p> */}
        <h1 className="mt-10 text-4xl md:text-8xl max-sm:text-[55px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 xl:pr-10 max-sm::p-0">
            Welcome to
          </span>
          <br />
          <span className="text-purple-900 inline-block mt-3">
            Mo'Adunni Fashion Store{" "}
          </span>{" "}
        </h1>
        <p className="text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
         Step into comfort with our timeless African-inspired collections, curated and  crafted for the modern you.
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
          {statistics.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="font-montserrat leading-7 text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:pb-24 bg-primary bg-hero bg-cover bg-center">
        {bigDressImg && (
          <Image
            src={bigDressImg}
            alt="shoe collection"
            height={300}
            width={300}
            id="hero-image"
            className="object-contain relative z-10 md:w-[500px] h-[500px]"
          />
        )}

        <div className="flex sm:gap-6 gap-4 absolute -bottom-[-10%] md:-bottom-[5%] sm:left-[10%] max-sm:px-6 items-center justify-center">
          {products.map((dress, index) => (
            <Link href={`#hero-image`} key={index}>
              <HeroDressCard
                imgURL={dress}
                key={index}
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
