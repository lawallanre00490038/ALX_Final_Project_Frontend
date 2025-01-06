'use client'

import { useState } from 'react'
import React from 'react'
import { headerLogo } from "@/assets/images";
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        console.log("Error after login at form page", result.error)
        setError('Invalid email or password')
      } else {
        router.push('/') // Redirect to dashboard on successful login
      }
      console.log("Success after login at form page")
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-xl">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg md:min-w-[500px]">
        <div className='flex flex-col items-center justify-center gap-2'>
          <Image
            src={headerLogo}
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h3 className="text-2xl font-bold text-center">Login to <span className='text-purple-500'>Mo'Adunni</span></h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required", pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                } })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required", minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                } })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4 text-white bg-purple-500 rounded-lg hover:bg-primary">Login</Button>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <Button onClick={handleGoogleLogin} className="w-full px-4 py-4 text-white font-semibold bg-purple-500 rounded-lg hover:bg-purple-600 hover:text-black">
           <Image src="/google.svg" alt="Google Icon" width={30} height={30} className="inline-block mr-2" />
            Sign in with Google
          </Button>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

