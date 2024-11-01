import db from "@/db/db"
import { PageHeader } from "../../../_components/PageHeader"
import { ProductForm } from "../../_components/ProductForm"

const EditProductPage  = async ({ params }: { params: { id: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });
  return <>
  <div className="px-10 overflow-hidden">
    <PageHeader>Edit Product</PageHeader>
    <ProductForm  product={product}/>
  </div>
    
  </>

}

export default EditProductPage;