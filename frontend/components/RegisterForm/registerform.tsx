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
import SiteFullTitle from '../SiteFullTitle/sitefulltitle';
import { useAppSelector } from '@/redux/store';
import './registerform.css';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

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

function RegisterForm() {
  const { push } = useRouter();
  const csrfToken = getCSRF();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  // Defining form defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      conf_password: ""
    },
    mode: 'onChange',
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!csrfToken) {
      console.error("CSRF token is missing");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          conf_password: values.conf_password,
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

  return ( auth ? redirect('/') :
    <div className="register_form_comp flex align-center justify-center flex-col flex-nowrap gap-6 lg:w-1/2 rounded-lg p-8">
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-y-8 lg:w-full lg:h-auto lg:flex-col lg:flex-nowrap align-center items-center flex-col flex-nowrap">
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