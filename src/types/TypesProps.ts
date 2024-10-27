export type DayshBoardCardProps = {
  title: string;
  subtitle: string;
  body: string;
}

// Define the Product type
export type Product = {
  id: string;
  name: string;
  priceInNaira: number;
  isAvailableForPurchase: boolean;
  category: string; // Assuming ProductCategory is a string, adjust if it's an enum or another type
  _count: {
    orders: number;
  };
};


export type ProductCardProps = {
  id?: string;
  imagePath: string;
  name: string;
  priceInNaira: number;
  isLast?: boolean;
  category: string;
  description: string;
  createdAt?: string;
  count?: any;
};