"use client"

import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'

interface EmailSettingsProps {
  csrfToken: string;
}

type EmailData = {
  email: string;
  new_email: string;
}

const EmailSettings = ({ csrfToken }: EmailSettingsProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/update/email`, {
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
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(ErrorConstants.EMAIL_UPDATE, error);
      toast.error(ErrorConstants.EMAIL_UPDATE);
    }
  }

  const renderEmailField = (name: keyof EmailData,
                            id: string, placeholder: string,
                            inputClass: string) => {
    return <FormField
      name={name}
      control={formEmail.control}
      render={({ field }) => (
        <FormItem className="w-4/6">
          <FormControl>
            <Input placeholder={placeholder}
                    required
                    type="email"
                    className={inputClass}
                    autoComplete='on'
                    id={id}
                    {...field}/>
          </FormControl>
          <FormMessage>
          {formEmail.formState.errors[name]?.message}
          </FormMessage>
        </FormItem>
      )}
    />          
  }

  return (<>
    <Form {...formEmail}>
      <form onSubmit={formEmail.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="email_form"
            autoComplete='on'>
        <Label htmlFor="current_email" className="text-xl">Email</Label>
        <p className="text-muted-foreground py-2">Change the email address associated with this account.</p>
        {renderEmailField("email", "current_email", "Current email", "current_email")}
        {renderEmailField("new_email", "new_email", "New email", "new_email")}
        <Button type="submit"
                className="self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
                  Save changes
        </Button>
      </form>
    </Form>
  </>)
}

export default EmailSettings