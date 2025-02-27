import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "@/assets/icons";
import {
  customer1,
  customer2
} from "@/assets/images";

export const navItems = [
  { href: "/#about-us", label: "About Us" },
  { href: "/#products", label: "Products" },
  { href: "/#contact-us", label: "Contact Us" },
];


export const statistics = [
  { value: "5+", label: "Brands" },
  { value: "2+", label: "Shops" },
  { value: "50+", label: "Customers" },
];

export const services = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews = [
  {
    imgURL: customer1,
    customerName: "Olanrewaju Lawal",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Mrs. Lolade Akeem",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Ready to Wear", link: "/" },
      { name: "Ankara", link: "/" },
      { name: "Jewelry", link: "/" },
      { name: "Adire T.shirt and Fabrics", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "morayo234@gmail.com", link: "mailto:morayo234@gmail.com" },
      { name: "+234 818 521 8295", link: "tel:+234 818 521 8295" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
