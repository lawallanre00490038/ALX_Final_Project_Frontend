import bcrypt from "bcrypt";

export async function saltAndHashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error during password hashing.");
  }
}
