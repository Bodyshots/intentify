"use client"

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { useAppSelector } from '@/redux/store';
import './registerform.css';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { setAuth } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';
import { ErrorConstants } from '@/constants/errors';
import { FieldConstants } from '@/constants/fields';
import getCSRF from '@/lib/GetCSRF';
import { APIConstants } from '@/constants/api';
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom';
import SubmitBtn from '@/components/SubmitBtn/submitbtn';

const formSchema = z.object({
  email: z.string().email({ message: ErrorConstants.EMAIL_VALID})
  .max(FieldConstants.EMAIL_MAX, {
    message: ErrorConstants.EMAIL_LONG
  }).trim(),
  password: z.string().min(FieldConstants.PASS_MIN, {
    message: ErrorConstants.PASS_SHORT,
  }).max(FieldConstants.PASS_MAX, {
    message: ErrorConstants.PASS_LONG
  }).trim(),
  conf_password: z.string(),
}).refine((values) => {
    return values.password === values.conf_password;
  },
  {
    message: ErrorConstants.PASS_MISMATCH,
    path: ["conf_password"],
});

type RegisterData = {
  email: string;
  password: string;
  conf_password: string;
}

function RegisterForm() {
  const csrfToken = getCSRF();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useAppDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
        method: APIConstants.POST,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          conf_password: conf_password,
        }),
        credentials: APIConstants.CRED_INCLUDE,
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        return true;
      }
      else {
        toast.error(data.message);
        return false;
      }
    } 
    catch (error) {
      console.error(ErrorConstants.REGISTER, error);
      toast.success(ErrorConstants.REGISTER);
      return false;
    }
  }

  async function login_req(email: string, password: string) {
    setLoadingSubmit(true);
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: APIConstants.POST,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: APIConstants.CRED_INCLUDE,
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
      console.error(ErrorConstants.LOGIN, error);
      toast.error(ErrorConstants.LOGIN);
    }
    setLoadingSubmit(false);
  }

  async function onSubmit(values: RegisterData) {
    setLoadingSubmit(true);
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      return;
    }
    const registered = await register_req(values.email, values.password, values.conf_password);
    setLoadingSubmit(false);
    if (registered) {
      await login_req(values.email, values.password)
    }
  }

  return ( auth ? redirect('/') :
    <div className={`register_form_comp flex justify-center flex-col flex-nowrap gap-6 rounded-lg p-8`}>
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-y-8 lg:w-full lg:h-auto lg:flex-col lg:flex-nowrap align-center items-center flex-col flex-nowrap"
            name="register_form">
        <FormFieldCustom
          name="email"
          type="email"
          id="register_email"
          autoComplete='on'
          placeholder='Email'
          desc="Enter your email here"
          control={form.control}
          errors={form.formState.errors}
          required={true}
          formItemClass='w-4/6'
        />
        <FormFieldCustom
          name="password"
          type="password"
          id="register_password"
          autoComplete='off'
          placeholder='Password'
          desc="Enter your password here"
          control={form.control}
          errors={form.formState.errors}
          required={true}
          formItemClass='w-4/6'
        />
        <FormFieldCustom
          name="conf_password"
          type="password"
          id="register_conf_password"
          autoComplete='off'
          placeholder='Confirm Password'
          desc="Confirm your password here"
          control={form.control}
          errors={form.formState.errors}
          required={true}
          formItemClass='w-4/6'
        />
        <span className="text-center">Already have an account? Click <u className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors"><Link href={'/login'}>here!</Link></u></span>
        <SubmitBtn
          baseText='Submit'
          loadingText='Submitting...'
          loadingSubmit={loadingSubmit}
          btnClassName='hover:bg-custom_green_hover dark:hover:bg-muted-foreground'
        />
      </form>
    </Form>
    </div>
  )
}

export default RegisterForm