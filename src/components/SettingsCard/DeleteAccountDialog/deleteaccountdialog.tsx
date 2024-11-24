"use client"

import React, { useState } from 'react'
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
import { Form } from "@/components/ui/form"
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { setAuth } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom'
import { redirect } from 'next/navigation'
import SubmitBtn from '@/components/SubmitBtn/submitbtn'

interface DeleteAccountDialogProps {
  csrfToken: string;
}

type AccountData = {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({ message: ErrorConstants.EMAIL_VALID }).trim(),
  password: z.string()
})

const DeleteAccountDialog = ({ csrfToken }: DeleteAccountDialogProps) => {
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const dispatch = useAppDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
    setLoadingSubmit(true);
    if (!csrfToken && auth) {
      console.error(ErrorConstants.CSRF);
      setLoadingSubmit(false);
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/delete`, {
        method: APIConstants.DELETE,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: APIConstants.CRED_INCLUDE,
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
      console.error(ErrorConstants.ACC_DELETE, error);
      toast.error(ErrorConstants.ACC_DELETE);
    }
    setLoadingSubmit(false);
    redirect('/');
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
            <FormFieldCustom
              name={"email"}
              id="delete_email"
              placeholder="Email"
              type="email"
              autoComplete='off'
              desc="Enter your email here"
              control={form.control}
              errors={form.formState.errors}
              formItemClass='w-4/6'
              required={true}
            />
            <FormFieldCustom
              name={"password"}
              id="delete_password"
              placeholder="Password"
              type="password"
              autoComplete='off'
              desc="Enter your email here"
              control={form.control}
              errors={form.formState.errors}
              formItemClass='w-4/6'
              required={true}
            />
            <SubmitBtn
              variant={"destructive"}
              baseText='Delete my account'
              loadingText='Deleting...'
              loadingSubmit={loadingSubmit}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </>)
}

export default DeleteAccountDialog