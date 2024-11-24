"use client"

import React, { useState } from 'react'
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { setFirstName, setLastName } from '@/redux/slices/nameSlice'
import { useAppDispatch } from '@/redux/store'
import { ErrorConstants } from '@/constants/errors'
import { APIConstants } from '@/constants/api'
import { FieldConstants } from '@/constants/fields'
import FormFieldCustom from '@/components/FormFieldCustom/formfieldcustom'
import { useAppSelector } from '@/redux/store'
import SubmitBtn from '@/components/SubmitBtn/submitbtn'

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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const firstName = useAppSelector((state) => state.name_persist.name_reduce.firstName);
  const lastName = useAppSelector((state) => state.name_persist.name_reduce.lastName);

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
      first_name: firstName,
      last_name: lastName,
    }
  })

  async function onSubmit(values: NameData) {
    setLoadingSubmit(true);
    if (!csrfToken) {
      console.error(ErrorConstants.CSRF);
      setLoadingSubmit(false);
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
    setLoadingSubmit(false);
  }

  return (<>
    <Form {...formNames}>
      <form onSubmit={formNames.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-7/12"
            name="name_form">
        <Label htmlFor="first_name" className="text-xl">First and last names</Label>
        <p className="text-muted-foreground py-2">Change the first and last names associated with this account. This will only change how
        you are greeted by our home page.</p>
        <FormFieldCustom
          name="first_name"
          control={formNames.control}
          formItemClass='w-4/6'
          placeholder='First name'
          type="text"
          autoComplete='on'
          id="first_name_form"
          errors={formNames.formState.errors}
          required={false}
        />
        <FormFieldCustom
          name="last_name"
          control={formNames.control}
          formItemClass='w-4/6'
          placeholder='Last name'
          type="text"
          autoComplete='on'
          id="last_name_form"
          errors={formNames.formState.errors}
          required={false}
        />
        <SubmitBtn
          loadingSubmit={loadingSubmit} 
          baseText={"Save Changes"}
          loadingText={"Saving..."}
          btnClassName="self-start inline-flex w-auto my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground"
        />
      </form>
    </Form>
  </>)
  }

export default NameSettings