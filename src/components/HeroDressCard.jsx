import Image from "next/image";


const HeroDressCard = ({ imgURL, changeBigDressmage, bigDressImg }) => {
  const handleClick = () => {
    if (bigDressImg !== imgURL.imagePath) {
      changeBigDressmage(imgURL.imagePath);
    }
  };

  return (
    <div
      className={`border-2 rounded-xl
  ${
    bigDressImg === imgURL.imagePath ? "border-purple-900" : "border-transparent"
  } cursor-pointer max-sm:flex-1
  `}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <Image
          src={imgURL.imagePath}
          alt="shoe collection"
          width={120}
          height={120}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeroDressCard;
