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
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface NameSettingsProps {
  csrfToken: string;
}

type NameData = {
  first_name: string;
  last_name: string
}

const NameSettings = ({ csrfToken }: NameSettingsProps) => {

  const formNameSchema = z.object({
    first_name: z.string().trim(),
    last_name: z.string().trim()
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
      console.error("CSRF token is missing");
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/users/update/names', {
        method: 'PUT',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name
        }),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating email", error);
    }
  }

  return (<>
    <Form {...formNames}>
      <form onSubmit={formNames.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-7/12">
        <Label htmlFor="names" className="text-xl">First and last names</Label>
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