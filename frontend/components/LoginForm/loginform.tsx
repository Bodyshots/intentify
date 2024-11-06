"use client"

import React from 'react';
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.'}).trim(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(80, {
    message: "Password must be less than 80 characters."
  }),
  conf_password: z.string().min(8).max(80),
}).refine((values) => {
    return values.password === values.conf_password;
  },
  {
    message: "Passwords do not match",
    path: ["conf_password"],
});

function LoginForm() {

  const navigate = useNavigate();

  // Defining form defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'appliaction/json' },
      body: JSON.stringify({ "email": values.email,
                             "password": values.password
       })
    }

    fetch('http://localhost:4000/login', request)
    .then(response => response.json()
    .then(data => ({
      data: data,
      response: response
    })).then(res => {
      if (res.response.ok) {
        navigate('/')
      }
    }))
  }

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" 
                       required 
                       type="email" 
                       {...field}/>
              </FormControl>
              <FormDescription>
                Enter your email here
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password"
                       required
                       type="password"
                       {...field}/>
              </FormControl>
              <FormDescription>
                Enter your password here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default LoginForm