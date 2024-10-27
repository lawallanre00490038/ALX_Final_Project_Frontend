import { PageHeader } from "../../_components/PageHeader"
import { ProductForm } from "../_components/ProductForm"

const NewProductPage  = () => {
  return <>
  <div className="px-10 overflow-hidden">
    <PageHeader>Add Product</PageHeader>
    <ProductForm />
  </div>
    
  </>

}

export default NewProductPage;