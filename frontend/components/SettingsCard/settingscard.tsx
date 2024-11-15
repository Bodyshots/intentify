"use client";

import './settingscard.css'
import '../../app/globals.css'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ThemeSettings from '../ThemeSettings/themesettings';
import EmailSettings from '../EmailSettings/emailsettings';

import getCSRF from '@/lib/GetCSRF';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import NameSettings from '../NameSettings/namesettings';
import PasswordSettings from '../PasswordSettings/passwordsettings';
import DeleteAccountDialog from '../DeleteAccountDialog/deleteaccountdialog';

export const SettingsCard = () => {
  const csrfToken = getCSRF();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  return ( !auth ? redirect('/') :
    <div className="settings_container bg-background px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">Settings</h1>
      <ThemeSettings/>
      <h2 className="text-4xl py-4">My Account</h2>
      <NameSettings csrfToken={csrfToken}/>
      <EmailSettings csrfToken={csrfToken}/>
      <PasswordSettings csrfToken={csrfToken}/>
      <div className="flex flex-col gap-4">
        <Label htmlFor="delete_acc" className="text-xl">Delete your account</Label>
        <p className="text-muted-foreground pb-4">You won't be able to recover account once you delete it.</p>
      </div>
      <DeleteAccountDialog csrfToken={csrfToken}/>
    </div>
  )
}
