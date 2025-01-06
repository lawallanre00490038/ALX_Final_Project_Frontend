import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb } from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use JWT strategy for session management 
  session: {
    strategy: "jwt",
  },
  
  providers: [
    CredentialsProvider({
      credentials:  {
        name: {},
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        try {
          // Verify if the user exists and the credentials match
          const email = credentials.email as string;
          const password = credentials.password as string;
          
          const user = await getUserFromDb(email, password);
          console.log("User found:", user);

          if (!user) {
            throw new Error("Invalid credentials.");
          };

          // Return user object containing essential profile details
          return {
            ...user,
            id: String(user.id), // Convert id to string
          };


        } catch (error) {
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),

    // Google OAuth provider
    Google
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback called:", token, user); 
      // Add custom logic for handling JWT tokens
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log("JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;  // Cast to string
        session.user.email = token.email as string;
        session.user.name = token.name as string;  // Add name
        session.user.image = token.picture as string;  // Add image
      }
      console.log("Session after callback:", session);
      return session;
    },
  },

  // Custom pages for authentication
  pages: {
    signIn: "/authPages/login",
    // error: "/auth/error", 
  },

  // Ensure you have this set in your environment variables
  secret: process.env.NEXTAUTH_SECRET,
  
  // Add events for logging or analytics if required
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    },
  },// Ensure you have this set in your environment variables
});
