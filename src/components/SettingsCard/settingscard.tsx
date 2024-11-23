"use client";

import './settingscard.css'
import ThemeSettings from './ThemeSettings/themesettings';
import EmailSettings from './EmailSettings/emailsettings';

import getCSRF from '@/lib/GetCSRF';
import NameSettings from './NameSettings/namesettings';
import PasswordSettings from './PasswordSettings/passwordsettings';
import DeleteAccountDialog from './DeleteAccountDialog/deleteaccountdialog';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { ErrorConstants } from '@/constants/errors';

export const SettingsCard = () => {
  const csrfToken = getCSRF();
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  useEffect(() => {
    setIsLoaded(true);
    if (!auth) {
      toast.error(ErrorConstants.AUTH_PROTECTED);
      redirect('/'); // Redirect unauthenticated users
    }
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="settings_container bg-background px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">Settings</h1>
      <ThemeSettings/>
      <h2 className="text-4xl py-4">My Account</h2>
      <NameSettings csrfToken={csrfToken}/>
      <EmailSettings csrfToken={csrfToken}/>
      <PasswordSettings csrfToken={csrfToken}/>
      <DeleteAccountDialog csrfToken={csrfToken}/>
    </div>
  );
}
