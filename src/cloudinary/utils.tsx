import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: "datimqvu9",
    api_key: "755281172548722",
    api_secret: "itDFN-VYaGa0_1-_mUB6TbIUu5w"
});

// Function to save and manipulate the image
export const saveAndManipulateImageToCloudinary = async (data: any, deletePrevious?: boolean) => {
    // Convert the image file to a base64 string

    if (deletePrevious) {
        await cloudinary.v2.uploader.destroy(data.public_id);
        return;
    }

    const base64Image = {
      content: `data:${data.image.type};base64,${Buffer.from(await data.image.arrayBuffer()).toString('base64')}`
    };

    // Upload to Cloudinary with the custom public_id
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(
      base64Image.content,
      {
        folder: data.category,
        resource_type: 'image',
      }
    );

    return uploadedImageResponse;
};



 export const imagePathFunction = (imageResponse: any)=> {
    return `${process.env.CLOUDINARY_IMAGE_URL}/${imageResponse?.asset_folder}/${imageResponse?.display_name}.jpg`
 }