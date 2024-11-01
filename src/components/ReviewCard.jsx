import Image from "next/image";
import { star } from "../assets/icons";

const ReviewCard = ({ imgURL, customerName, rating, feedback}) => {
  return (
    <>
      <Image
        src={imgURL}
        alt="customer"
        width={150}
        height={150}
        className="rounded-full object-cover w-[150px] h-[150px]"
      />
      <p className="mt-6 max-w-sm text-center info-text">{feedback}</p>
      <div className="mt-3 flex justify-center items-center gap-2.5">
        <Image src={star} 
        width={24} 
        alt="star"
        height={24} 
        className="object-contain m-0" />
        <p className="text-xl font-montserrat text-slate-gray">({rating})</p>
      </div>
      <h3 className="mt-1 font-palanquin text-3xl text-center font-bold">
        {customerName}
      </h3>
    </>
  );
};

export default ReviewCard;
