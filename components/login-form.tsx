"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormRootError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'



const formSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email."
  }),
  password: z.string().min(1, "Please provide a password")
})


export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password
    }, {
      onRequest: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (ctx) => {
        setIsLoading(false);
        form.setError("root", {message: ctx.error.message});
      }
    });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormRootError />
            <Button type="submit" className="w-full select-none" disabled={isLoading}>
              {
                isLoading && 
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              }
              {
                !isLoading && 
                "Login"
              }
              
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </Form>

      </CardContent>
    </Card>
  )
}
