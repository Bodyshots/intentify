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
    email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
    new_email: z.string().email({ message: 'Please enter a valid email!'}).trim()
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
      console.error("CSRF token is missing");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/update/email`, {
        method: 'PUT',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          new_email: values.new_email
        }),
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating email", error);
      toast.error("Error updating email");
    }
  }

  const renderEmailField = (name: keyof EmailData,
                            id: string, placeholder: string) => {
    return <FormField
      name={name}
      control={formEmail.control}
      render={({ field }) => (
        <FormItem className="w-4/6">
          <FormControl>
            <Input placeholder={placeholder}
                    required
                    type="email"
                    className="current_email"
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
        {renderEmailField("email", "current_email", "Current email")}
        {renderEmailField("new_email", "new_email", "New email")}
        <Button type="submit"
                className="self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
                  Save changes
        </Button>
      </form>
    </Form>
  </>)
}

export default EmailSettings