import db from "@/db/db"; // Ensure this imports your configured Prisma client

type SaveUserInput = {
  name: string;
  email: string;
  password: string;
};

export async function saveUserToDb({ name, email, password }: SaveUserInput) {
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password, // Store the hashed password
      },
    });

    return newUser;
  } catch (error: any) {
    if (error.code === "P2002") {
      // Handle unique constraint violation
      throw new Error("Email already exists. Please use a different email.");
    }
    console.error("Error saving user to the database:", error);
    throw new Error("An error occurred while saving the user.");
  }
}
