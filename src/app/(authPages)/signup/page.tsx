'use client';

import { useState } from 'react';
import React from 'react';
import { headerLogo } from "@/assets/images";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from 'next/image';
import { signIn } from 'next-auth/react'

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Signup failed.");
      }

      // Redirect to login on success
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 text-left bg-white shadow-lg rounded-lg md:min-w-[500px]">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={headerLogo}
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h3 className="text-2xl font-bold text-center">
            Sign up to <span className="text-purple-500">Mo'Adunni</span>
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <Label htmlFor="name">Fullname</Label>
            <Input
              type="text"
              placeholder="Fullname"
              {...register("name", {
                required: "Fullname is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Fullname must contain only letters and spaces",
                },
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2"
          >
            <Image
              src="/google.svg"
              alt="Google Icon"
              width={20}
              height={20}
              className="inline-block"
            />
            Sign up with Google
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
