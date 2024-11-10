"use client"

import React, { useEffect } from 'react';
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { useAuth } from '@/contexts/AuthContext';
import SiteFullTitle from '../SiteFullTitle/sitefulltitle';

import { setCsrfToken } from '@/redux/slices/csrfSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
  password: z.string()
})

function RegisterForm() {
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const csrfToken = useSelector((state: RootState) => state.csrf.token)
  const { login } = useAuth();

  // Fetch CSRF token when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/api/get-csrf-token",
      { method: "GET",
        credentials: "include",
       })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCsrfToken(data.csrf_token));
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
    mode: 'onChange',
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
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
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
              <FormMessage>
              {form.formState.errors.email && form.formState.errors.email.message}
              </FormMessage>
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
              <FormMessage>
              {form.formState.errors.password && form.formState.errors.password.message}
              </FormMessage>
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