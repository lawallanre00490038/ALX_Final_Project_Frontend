import bcrypt from "bcrypt";

export async function saltAndHashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error during password hashing.");
  }
}
