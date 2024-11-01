"use server"

import db from "@/db/db"
import { z } from "zod"
// import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { ProductCategory } from "@prisma/client";
import { saveAndManipulateImageToCloudinary, imagePathFunction } from "@/cloudinary/utils"


const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInNaira: z.coerce.number().int().min(1),
  // file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
  category: z.string().min(2)
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  // await fs.mkdir("products", { recursive: true })
  // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))


  // Save Image
  // await fs.mkdir(`public/products/${data.category}`, { recursive: true })
  // const imagePath = `/products/${data.category}/${crypto.randomUUID()}-${data.image.name}`
  // await fs.writeFile(
  //   `public${imagePath}`,
  //   Buffer.from(await data.image.arrayBuffer())
  // )

 const imageResponse = (await saveAndManipulateImageToCloudinary(data))
 
 const imagePath = imagePathFunction(imageResponse)

 console.log("First Image from Cloudinary", imagePath)

  await db.product.create({
    data: {
      isAvailableForPurchase: true,  
      name: data.name,
      description: data.description,
      priceInNaira: data.priceInNaira,
      filePath: "", //filePath,
      imagePath,
      category: data.category as ProductCategory, 
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  // let filePath = product.filePath
  // if (data.file != null && data.file.size > 0) {
  //   await fs.unlink(product.filePath)
  //   filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  //   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  // }

  let imagePath = product.imagePath
  if (data.image != null && data.image.size > 0) {
    // await fs.unlink(`public${product.imagePath}`)
    // imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    // await fs.writeFile(
    //   `public${imagePath}`,
    //   Buffer.from(await data.image.arrayBuffer())
    // )
    // Update the cloudinary image
    const imageResponse = (await saveAndManipulateImageToCloudinary(data))
    imagePath = imagePathFunction(imageResponse)
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInNaira: data.priceInNaira,
      // filePath,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}


// Delete item
export async function deleteProduct(id: string) {

  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  // Delete the cloudinary iamge
  const imageResponse = (await saveAndManipulateImageToCloudinary({ public_id: product.imagePath }, true))?.url ?? "";
  
  revalidatePath("/")
  redirect("/admin/products")
}


// Get all products
export const getAllProducts = async () => {
  
  const data = await db.product.findMany(
    {
      select: {
        id: true,
        name: true,
        priceInNaira: true,
        isAvailableForPurchase: true,
        category: true,
        _count: {select: {orders: true}},
        imagePath: true,
      },
      orderBy: {name: "asc"},
    },
  )
  console.log(data)
  return data
}