"use client"

import React, { useState } from 'react'
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom'
import SubmitBtn from '@/components/SubmitBtn/submitbtn'
import { OtherConstants } from '@/constants/other'
import { useAppDispatch } from '@/redux/store'
import { setEmail } from '@/redux/slices/emailSlice'

interface EmailSettingsProps {
  csrfToken: string | null;
}

type EmailData = {
  email: string;
  new_email: string;
}

const EmailSettings = ({ csrfToken }: EmailSettingsProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const dispatch = useAppDispatch();

  const formEmailSchema = z.object({
    email: z.string().email({ message: ErrorConstants.EMAIL_VALID})
    .max(FieldConstants.EMAIL_MAX, {
      message: ErrorConstants.EMAIL_LONG
    }).trim(),
    new_email: z.string().email({ message: ErrorConstants.EMAIL_VALID})
    .max(FieldConstants.EMAIL_MAX, {
      message: ErrorConstants.EMAIL_LONG
    }).trim(),
  })

  const formEmail = useForm<EmailData>({
    resolver: zodResolver(formEmailSchema),
    defaultValues: {
      email: "",
      new_email: "",
    },
    mode: 'onChange',
  });

  async function onSubmit(values: EmailData) {
    setLoadingSubmit(true);
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      setLoadingSubmit(false);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/update/email`, {
        method: APIConstants.PUT,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: values.email,
          new_email: values.new_email
        }),
        credentials: APIConstants.CRED_INCLUDE,
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setEmail(values.new_email));
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(ErrorConstants.EMAIL_UPDATE, error);
      toast.error(ErrorConstants.EMAIL_UPDATE);
    }
    setLoadingSubmit(false);
  }

  return (<>
    <Form {...formEmail}>
      <form onSubmit={formEmail.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="email_form"
            autoComplete='on'>
        <Label htmlFor="current_email" className="text-xl">Email</Label>
        <p className="text-muted-foreground py-2">Change the email address associated with this account.</p>
        <FormFieldCustom 
          name={"email"} 
          id={"current_email"}
          placeholder={"Current email"}
          type={"email"}
          autoComplete={"off"}
          desc=""
          control={formEmail.control}
          errors={formEmail.formState.errors}
          formItemClass='w-4/6'
          required={true}
        />
        <FormFieldCustom 
          name={"new_email"} 
          id={"new_email"}
          placeholder={"New email"}
          type={"email"}
          autoComplete={"on"}
          desc=""
          control={formEmail.control}
          errors={formEmail.formState.errors}
          formItemClass='w-4/6'
          required={true}
        />
        <SubmitBtn
          loadingSubmit={loadingSubmit} 
          baseText={OtherConstants.SAVE}
          loadingText={OtherConstants.SAVE_LOAD}
          btnClassName="self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground"
        />
      </form>
    </Form>
  </>)
}

export default EmailSettings