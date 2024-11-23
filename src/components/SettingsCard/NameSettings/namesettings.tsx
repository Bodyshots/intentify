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
import { setFirstName, setLastName } from '@/redux/slices/nameSlice'
import { useAppDispatch } from '@/redux/store'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'

interface NameSettingsProps {
  csrfToken: string;
}

type NameData = {
  first_name: string;
  last_name: string
}

const NameSettings = ({ csrfToken }: NameSettingsProps) => {
  const dispatch = useAppDispatch();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const formNameSchema = z.object({
    first_name: z.string().max(FieldConstants.NAME_MAX, {
      message: ErrorConstants.NAME_LONG
    }).trim(),
    last_name: z.string().max(FieldConstants.NAME_MAX, {
      message: ErrorConstants.NAME_LONG
    }).trim()
  })

  const formNames = useForm<NameData>({
    resolver: zodResolver(formNameSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    }
  })

  async function onSubmit(values: NameData) {
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/update/names`, {
        method: APIConstants.PUT,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name
        }),
        credentials: APIConstants.CRED_INCLUDE,
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setFirstName(values.first_name));
        dispatch(setLastName(values.last_name));
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(ErrorConstants.NAME_UPDATE, error);
      toast.error(ErrorConstants.NAME_UPDATE);
    }
  }

  return (<>
    <Form {...formNames}>
      <form onSubmit={formNames.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="name_form">
        <Label htmlFor="first_name" className="text-xl">First and last names</Label>
        <p className="text-muted-foreground py-2">Change the first and last names associated with this account. This will only change how
        you are greeted by our home page.</p>
        <FormField
          name="first_name"
          control={formNames.control}
          render={({ field }) => (
            <FormItem className="w-4/6">
              <FormControl>
                <Input placeholder="First name"
                        type="text"
                        className="first_name"
                        autoComplete='on'
                        id="first_name"
                        {...field}/>
              </FormControl>
              <FormMessage>
              {formNames.formState.errors.first_name?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formNames.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="w-4/6">
              <FormControl>
                <Input placeholder="Last name"  
                        type="text"
                        className="last_name"
                        autoComplete='on'
                        {...field}/>
              </FormControl>
              <FormMessage>
              {formNames.formState.errors.last_name?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit"
                className="self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">
                  Save changes
        </Button>
      </form>
    </Form>
  </>)
  }

export default NameSettings