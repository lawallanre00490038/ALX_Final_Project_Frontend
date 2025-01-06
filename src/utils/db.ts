import db from "@/db/db";
import bcrypt from "bcrypt";


interface User {
  id: string;
  email: string;
  password: string;
}

export async function getUserFromDb(email: string, passwordHash: string): Promise<User | null> {
  // Retrieve the user from the database
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    console.log("User retrieved from DB:", user);

      // Check if the user exists and if the password hash matches
    if (user && await bcrypt.compare(passwordHash, user.password)) {
      console.log("User found and password matches.");
      return user;
    }
    else {
      console.log("User not found or password does not match.");
      return null;
    }

  } catch (error: any) {
    console.error("Error retrieving user from the database:", error);
    throw new Error("An error occurred while retrieving the user.");
  }
}
