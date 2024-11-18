"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { setAuth } from '@/redux/slices/authSlice'
import { toast } from 'sonner'

interface DeleteAccountDialogProps {
  csrfToken: string;
}

type AccountData = {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
  password: z.string()
})


const DeleteAccountDialog = ({ csrfToken }: DeleteAccountDialogProps) => {
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const dispatch = useAppDispatch();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const form = useForm<AccountData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange',
  })

  async function onSubmit(values: AccountData) {
    if (!csrfToken && auth) {
      console.error("CSRF token is missing");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/delete`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: 'include',
      });
      const data = await response.json();
  
      if (response.ok) {
        dispatch(setAuth(false));
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Error deleting account", error);
      toast.error("Error deleting account");
    }
  }

  return (<>
    <div className="flex flex-col gap-4">
        <p className="text-xl">Delete your account</p>
        <p className="text-muted-foreground pb-4">You won't be able to recover account once you delete it.</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete my account</Button>
      </DialogTrigger>
        <DialogContent>
        <DialogHeader className="flex flex-col text-left ">
          <DialogTitle className="text-2xl">Delete my account</DialogTitle>
          <DialogDescription className="text-base">
            Remember, you won't be able to recover your account once you delete it. If you still wish to proceed,
            then please confirm your account credentials.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 login_form"
                name="delete_account_form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-4/6">
                  <FormControl>
                    <Input placeholder="Email" 
                          required 
                          type="email" 
                          autoComplete='off'
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
                          autoComplete='off'
                          {...field}/>
                  </FormControl>
                  <FormDescription>
                    Enter your password here
                  </FormDescription>
                  <FormMessage>
                  {form.formState.errors.password && form.formState.errors.password.message}
                  </FormMessage>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="destructive" 
                  type="submit">Yes, delete my account</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </>)
}

export default DeleteAccountDialog