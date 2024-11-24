"use client"

import './loginform.css'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form} from "@/components/ui/form"
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import Link from 'next/link';
import getCSRF from '@/lib/GetCSRF';
import { setAuth } from '@/redux/slices/authSlice';
import { setFirstName } from '@/redux/slices/nameSlice';
import { setLastName } from '@/redux/slices/nameSlice';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from "sonner";
import { ErrorConstants } from '@/constants/errors';
import { APIConstants } from '@/constants/api';
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom';
import SubmitBtn from '@/components/SubmitBtn/submitbtn';

const formSchema = z.object({
  email: z.string().email({ message: ErrorConstants.EMAIL_VALID}).trim(),
  password: z.string()
})

type LoginData = {
  email: string;
  password: string;
}

function LoginForm() {
  const csrfToken = getCSRF();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  // Defining form defaults
  const form = useForm<LoginData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange',
  })

  async function onSubmit(values: LoginData) {
    setLoadingSubmit(true);
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: APIConstants.POST,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: APIConstants.CRED_INCLUDE,
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
        dispatch(setFirstName(''));
        dispatch(setLastName(''));
        toast.error(data.message);
      }
    } catch (error) {
      console.error(ErrorConstants.LOGIN, error);
      toast.error(ErrorConstants.LOGIN);
    }
    setLoadingSubmit(false);
  }

  return auth ? redirect('/') : (
    <div className={`login_form_comp flex justify-center flex-col flex-nowrap gap-6 rounded-lg p-8`}>
      <SiteFullTitle titleClass='text-5xl' sloganClass='text-2xl'/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-y-8 lg:w-full lg:h-auto lg:flex-col lg:flex-nowrap align-center items-center flex-col flex-nowrap"
              name="login_form">
          <FormFieldCustom
            control={form.control}
            name="email"
            autoComplete='on'
            type="email"
            formItemClass='w-4/6'
            errors={form.formState.errors}
            id="login_email"
            desc="Enter your email here"
            required={true}
            placeholder='Email'
          />
          <FormFieldCustom
            control={form.control}
            name="password"
            autoComplete='off'
            type="password"
            formItemClass='w-4/6'
            errors={form.formState.errors}
            id="login_password"
            desc="Enter your password here"
            required={true}
            placeholder='Password'
          />
          <span className="text-center">Don't have an account? Click <u className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors"><Link href={'/register'}>here!</Link></u></span>
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

export default LoginForm