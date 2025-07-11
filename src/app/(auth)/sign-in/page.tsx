'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signInSchema} from '@/schemas/signInSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import {Library, Loader2} from 'lucide-react'
import Link from "next/link"



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
export default function SignInPage() {
  const router = useRouter() 
    type SignInFormData = z.infer<typeof signInSchema>
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const onsubmit=async(data:SignInFormData)=>{
      const Result=await signIn('credentials',{
        redirect:false,
        identifier:data.identifier,
        password:data.password
      }
      )
        if (Result?.ok) {
        toast.success("Sign In successfully");
        router.replace('/dashboard');
        }else {
        toast.error("Incorrect username/email or password");
      }

    }
        

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                   <Library className="h-6 w-6 text-white" />
                </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Mystery Message</h1>
            <h2 className="text-gray-600">Sign up to start your anonymous adventure</h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg px-8 py-8 border border-gray-200">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
                      
                          <FormField
                          control={form.control}
                          name="identifier"
                          render={({ field }) => (
                          <FormItem>
                          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                                 Identifier
                            </FormLabel>
                            <FormControl>
                            <Input 
                            type="identifier"
                            placeholder="Enter your Username or Email"
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                               />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem> )}/>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                             <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                        </FormLabel>
                        <FormControl>
                        <div className="relative">
                        <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                        </button>
                         </div>
                        </FormControl>
                         <FormMessage className="text-red-600 text-sm mt-1" />
                             </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          Don't have an account?{' '}
                           <Link 
                             href='/sign-up'
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
              </div>
            </div>
        </div>
    )

}