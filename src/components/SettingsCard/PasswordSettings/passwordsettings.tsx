"use client"

import React, { useState } from 'react'
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Label } from '@radix-ui/react-label'
import { toast } from 'sonner'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'
import { OtherConstants } from '@/constants/other'
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom'
import SubmitBtn from '@/components/SubmitBtn/submitbtn'

interface PasswordSettingsProps {
  csrfToken: string | null;
}

type PasswordData = {
  password: string;
  new_password: string;
}

const PasswordSettings = ({ csrfToken }: PasswordSettingsProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const formPasswordSchema = z.object({
    password: z.string(),
    new_password: z.string().min(FieldConstants.PASS_MIN, {
      message: ErrorConstants.PASS_SHORT,
    }).max(FieldConstants.PASS_MAX, {
      message: ErrorConstants.PASS_LONG
    })})

  const formPassword = useForm<PasswordData>({
    resolver: zodResolver(formPasswordSchema),
    defaultValues: {
      password: "",
      new_password: "",
    },
    mode: 'onChange',
  })

  async function onSubmit(values: PasswordData) {
    setLoadingSubmit(true);
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      setLoadingSubmit(false);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/update/password`, {
        method: APIConstants.PUT,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          password: values.password,
          new_password: values.new_password
        }),
        credentials: APIConstants.CRED_INCLUDE,
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(ErrorConstants.PASS_UPDATE, error);
      toast.error(ErrorConstants.PASS_UPDATE);
    }
    setLoadingSubmit(false);
  }

  return (<>
    <Form {...formPassword}>
      <form onSubmit={formPassword.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="password_form">
        <Label htmlFor="current_password" className="text-xl">Password</Label>
        <p className="text-muted-foreground py-2">Change the password used to sign into your account.</p>
        <FormFieldCustom
          name="password"
          formItemClass='w-4/6'
          placeholder='Current password'
          type="password"
          autoComplete='off'
          id="current_password_form"
          control={formPassword.control}
          errors={formPassword.formState.errors}
          required={true}
        />
        <FormFieldCustom
          name="new_password"
          formItemClass='w-4/6'
          placeholder='New password'
          type="password"
          autoComplete='off'
          id="new_password_form"
          control={formPassword.control}
          errors={formPassword.formState.errors}
          required={true}
        />
        <SubmitBtn
          loadingSubmit={loadingSubmit} 
          baseText={OtherConstants.SAVE}
          loadingText={OtherConstants.SAVE_LOAD}
          btnClassName='self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground'
        />
      </form>
    </Form>
  </>)
}

export default PasswordSettings