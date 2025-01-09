export const handleAddToCart = (cart: any, addToCart: any, imagePath: any, id: any) => {
  const productExists = cart.some((item: any) => item.product.imagePath === imagePath);

  if (productExists) {
    alert("Product is already in the cart!");
  } else {
    if (id) {
      addToCart(id);
    } else {
      console.error("Product ID is undefined");
    }
  }
  return;
};