import { NextResponse } from "next/server";
// import { saltAndHashPassword } from "@/utils/password";
import { saveUserToDb } from "@/utils/saveUserToDb";

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Hash the password
    // const hashedPassword = await saltAndHashPassword(password);
     const bcrypt = require("bcrypt");
     const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = await saveUserToDb({ name, email, password: hashedPassword });

    if (!user) {
      throw new Error("Failed to create user.");
    }

    // Return success response
    return NextResponse.json(
      { message: "User created successfully.", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
