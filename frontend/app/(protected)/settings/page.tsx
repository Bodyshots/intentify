import React from 'react'
import { SettingsCard } from '@/components/SettingsCard/settingscard'
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Settings';

  return {
    title: pageTitle,
  };
}

function Settings() {
  return ( <SettingsCard/> )
}

export default Settings