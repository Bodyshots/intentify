"use client"

import React from 'react';
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
import SiteFullTitle from '../SiteFullTitle/sitefulltitle';
import Link from 'next/link';

import getCSRF from '@/lib/GetCSRF';
import { setAuth } from '@/redux/slices/authSlice';
import { setFirstName } from '@/redux/slices/nameSlice';
import { setLastName } from '@/redux/slices/nameSlice';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
  password: z.string()
})

interface LoginFormProps {
  className_add?: string;
}

function LoginForm({ className_add }: LoginFormProps) {
  const csrfToken = getCSRF();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

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
    try {
      const response = await fetch('http://localhost:4000/login', {
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
      });
      const data = await response.json();
  
      if (response.ok) {
        dispatch(setAuth(true));
        dispatch(setFirstName(data.user.first_name));
        dispatch(setLastName(data.user.last_name));
        toast.success(data.message);
      }
      else {
        dispatch(setAuth(false));
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Error logging in");
    }
  }

  return auth ? redirect('/') : (
    <div className={`login_form_comp flex justify-center flex-col flex-nowrap gap-6 rounded-lg p-8
                  ${className_add}`}>
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-y-8 lg:w-full lg:h-auto lg:flex-col lg:flex-nowrap align-center items-center flex-col flex-nowrap"
              name="login_form">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-4/6">
                <FormControl>
                  <Input placeholder="Email" 
                        required 
                        type="email"
                        autoComplete='on'
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
                        autoComplete='off'
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
          <span className="text-center">Don't have an account? Click <u className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors"><Link href={'/register'}>here!</Link></u></span>
          <Button type="submit"
                  className="hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm