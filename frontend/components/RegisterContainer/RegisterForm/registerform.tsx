"use client"

import React from 'react';
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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import SiteFullTitle from '../../SiteFullTitle/sitefulltitle';
import { useAppSelector } from '@/redux/store';
import './registerform.css';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { setAuth } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';

import getCSRF from '@/lib/GetCSRF';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(80, {
    message: "Password must be less than 80 characters."
  }),
  conf_password: z.string(),
}).refine((values) => {
    return values.password === values.conf_password;
  },
  {
    message: "Passwords do not match",
    path: ["conf_password"],
});

interface RegisterFormProps {
  className_add?: string;
}

type RegisterData = {
  email: string;
  password: string;
  conf_password: string;
}

function RegisterForm({ className_add }: RegisterFormProps) {
  const { push } = useRouter();
  const csrfToken = getCSRF();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useAppDispatch();

  // Defining form defaults
  const form = useForm<RegisterData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      conf_password: ""
    },
    mode: 'onChange',
  })

  async function register_req(email: string, 
                              password: string, 
                              conf_password: string) {
    try {
      const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          conf_password: conf_password,
        }),
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        push('/login');
      }
      else {
        toast.error(data.message);
      }
    } 
    catch (error) {
      console.error("Error registering", error);
      toast.success("Error registering");
    }
  }

  async function login_req(email: string, password: string) {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setAuth(true));
        toast.success(data.message);
      }
      else {
        dispatch(setAuth(false));
        toast.error(data.message);
      }
    }
    catch (error) {
    console.error("Error logging in", error);
    toast.error("Error logging in");
    }
  }

  async function onSubmit(values: RegisterData) {
    if (!csrfToken) {
      console.error("CSRF token is missing");
      return;
    }
    await register_req(values.email, values.password, values.conf_password)
    await login_req(values.email, values.password)
  }

  return ( auth ? redirect('/') :
    <div className={`register_form_comp flex justify-center flex-col flex-nowrap gap-6 rounded-lg p-8 ${className_add}`}>
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-y-8 lg:w-full lg:h-auto lg:flex-col lg:flex-nowrap align-center items-center flex-col flex-nowrap"
            name="register_form">
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conf_password"
          render={({ field }) => (
            <FormItem className="w-4/6 focus:bg-red-600">
              <FormControl>
                <Input placeholder="Confirm Password"
                       required
                       type="password"
                       autoComplete='off'
                       {...field}/>
              </FormControl>
              <FormDescription>
                Confirm your password here
              </FormDescription>
              <FormMessage>
              {form.formState.errors.conf_password && form.formState.errors.conf_password.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <span className="text-center">Already have an account? Click <u className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors"><Link href={'/login'}>here!</Link></u></span>
        <Button type="submit"
                className="hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
          Submit
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default RegisterForm