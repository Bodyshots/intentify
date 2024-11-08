"use client"

import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import './loginform.css'
 
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
import { useRouter } from 'next/navigation';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { useAuth } from '@/contexts/AuthContext';
import SiteFullTitle from '../SiteFullTitle/sitefulltitle';

const formSchema = z.object({
  email: z.string(),
  password: z.string()
})

function RegisterForm() {
  const { push } = useRouter();
  const [csrfToken, setCsrfToken] = useState("");
  const { login } = useAuth();

  // Fetch CSRF token when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/api/get-csrf-token",
      { method: "GET",
        credentials: "include",
       })
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.csrf_token); // assuming your backend sends the token in { csrf_token: '...'}
        console.log(data.csrf_token);
      })
      .catch((err) => console.error("Error fetching CSRF token:", err));
  }, []);

  // Defining form defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    if (!csrfToken) {
      console.error("CSRF token is missing");
      return;
    }

    let request: RequestInit = {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: 'include',
    };

    if (await login(request)) {
      push('/')
    }
    else {
      console.log("Login request denied");
    }
  }

  return (
    <div className="login_form_comp">
      {SiteFullTitle(5, 2)}
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 login_form">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-4/6">
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
            <FormItem className="w-4/6">
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

export default RegisterForm