"use client";

import './settingscard.css'
import '../../app/globals.css'
import ThemeSettings from './ThemeSettings/themesettings';
import EmailSettings from './EmailSettings/emailsettings';

import getCSRF from '@/lib/GetCSRF';
import { useAppSelector } from '@/redux/store';
import NameSettings from './NameSettings/namesettings';
import PasswordSettings from './PasswordSettings/passwordsettings';
import DeleteAccountDialog from './DeleteAccountDialog/deleteaccountdialog';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export const SettingsCard = () => {
  const csrfToken = getCSRF();
  const [isLoaded, setIsLoaded] = useState(false); // Check if rendering is on the client

  useEffect(() => {
    setIsLoaded(true); // Indicate that we are on the client
  }, []);

  // Only render after client hydration
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
