"use client";

import './settingscard.css'
import '../../app/globals.css'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { useAuth } from '@/contexts/AuthContext';
import getCSRF from '@/lib/GetCSRF';

import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';

export const SettingsCard = () => {
  const csrfToken = getCSRF();
  const { email, password, firstName, lastName } = useAuth();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  const formEmailSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email!'}).trim(),
    new_email: z.string().email({ message: 'Please enter a valid email!'}).trim()
  });

  const formPasswordSchema = z.object({
    password: z.string(),
    new_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }).max(80, {
      message: "Password must be less than 80 characters."
    })}).refine((values) => {
      return values.password === password;
    },
  {
    message: "This password does not match your current password"
  })

  const formEmail = useForm<z.infer<typeof formEmailSchema>>({
    resolver: zodResolver(formEmailSchema),
    defaultValues: {
      email: email,
      new_email: "",
    },
    mode: 'onChange',
  });
  
  const formPassword = useForm<z.infer<typeof formPasswordSchema>>({
    resolver: zodResolver(formPasswordSchema),
    defaultValues: {
      password: "",
      new_password: "",
    },
    mode: 'onChange',
  })

  return ( !auth ? redirect('/') :
    <div className="settings_container bg-background px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">Settings</h1>
      <h2 className="text-4xl pt-4">Theme Preferences</h2>
      <p className="text-muted-foreground pt-2 pb-4">Choose the default theme for how Intentify looks for you.</p>
        <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Light</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Dark</Label>
        </div>
      </RadioGroup>
      <h2 className="text-4xl py-4">My Account</h2>
      <Form {...formEmail}>
        <form className="flex flex-col gap-2 w-7/12">
          <Label htmlFor="email" className="text-xl">Email</Label>
          <p className="text-muted-foreground py-2">Change the email address associated with this account.</p>
          <FormField
            control={formEmail.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-4/6">
                <FormControl>
                  <Input placeholder="Email" 
                         required 
                         type="email"
                         className="current_email"
                         {...field}/>
                </FormControl>
                <FormMessage>
                {formEmail.formState.errors.email && formEmail.formState.errors.email.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={formEmail.control}
            name="new_email"
            render={({ field }) => (
              <FormItem className="w-4/6">
                <FormControl>
                  <Input placeholder="New email" 
                         required 
                         type="email"
                         className="new_email"
                         {...field}/>
                </FormControl>
                <FormMessage>
                {formEmail.formState.errors.email && formEmail.formState.errors.email.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button className="p-4 my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">Save changes</Button>
      <Form {...formPassword}>
        <form className="flex flex-col gap-2 w-7/12">
          <Label htmlFor="password" className="text-xl">Password</Label>
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
                         {...field}/>
                </FormControl>
                <FormMessage>
                {formPassword.formState.errors.new_password && formPassword.formState.errors.new_password.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button className="p-4 my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">Save changes</Button>
      <div className="flex flex-col gap-4">
        <Label htmlFor="delete_acc" className="text-xl">Delete your account</Label>
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
              Are you sure? Remember, you won't be able to recover your account once you delete it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">Yes, delete my account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
