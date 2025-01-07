import Image from "next/image";

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  classname,
  onClick, // Optional onClick prop
}) => {
  return (
    <button
      onClick={onClick || undefined} // Safely attach onClick only if it exists
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none ${classname}
    ${
      backgroundColor
        ? `${backgroundColor} ${textColor} ${borderColor}`
        : "bg-purple-900 text-white border-purple-900"
    } rounded-full ${fullWidth && "w-full"}`}
    >
      {label}
      {iconURL && (
        <Image
          src={iconURL}
          alt="arrow right icon"
          className="ml-2 rounded-full w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;
