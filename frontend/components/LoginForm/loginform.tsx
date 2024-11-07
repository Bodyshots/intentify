"use client"

import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const formSchema = z.object({
  email: z.string(),
  password: z.string()
})

function RegisterForm() {
  const { push } = useRouter();
  const [csrfToken, setCsrfToken] = useState("");

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log(csrfToken)
    console.log(document.cookie)

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

    fetch('http://localhost:4000/login', request)
    .then(response => response.json()
    .then(data => ({
      data: data,
      response: response
    })).then(res => {
      if (res.response.ok) {
        console.log("login success");
        push('/')
      }
      else {
        console.log("Something went wrong");
      }
    }))
  }

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

export default RegisterForm