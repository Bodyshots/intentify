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
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'

interface PasswordSettingsProps {
  csrfToken: string;
}

type PasswordData = {
  password: string;
  new_password: string;
}

const PasswordSettings = ({ csrfToken }: PasswordSettingsProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/update/password`, {
        method: APIConstants.PUT,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: values.password,
          new_email: values.new_password
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
  }

  return (<>
    <Form {...formPassword}>
      <form onSubmit={formPassword.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="password_form">
        <Label htmlFor="current_password" className="text-xl">Password</Label>
        <p className="text-muted-foreground py-2">Change the password used to sign into your account.</p>
        <FormField
          control={formPassword.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-4/6">
              <FormControl>
                <Input placeholder="Current password" 
                        required 
                        type="password"
                        className="current_password"
                        autoComplete='off'
                        id="current_password"
                        {...field}/>
              </FormControl>
              <FormMessage>
              {formPassword.formState.errors.password && formPassword.formState.errors.password.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formPassword.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="w-4/6">
              <FormControl>
                <Input placeholder="New password" 
                        required 
                        type="password"
                        className="new_password"
                        autoComplete='off'
                        {...field}/>
              </FormControl>
              <FormMessage>
              {formPassword.formState.errors.new_password && formPassword.formState.errors.new_password.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit"
                className="self-start inline-flex w-auto p-4 my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
                  Save changes
        </Button>
      </form>
    </Form>
  </>)
}

export default PasswordSettings