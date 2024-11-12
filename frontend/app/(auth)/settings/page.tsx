import Head from 'next/head'
import React from 'react'
import { SettingsCard } from '@/components/SettingsCard/settingscard'
import { checkAuth } from '@/lib/checkauth'
import { redirect } from 'next/navigation'

const Settings = async () => {
  const isAuth = await checkAuth();

  if (!isAuth) {
    redirect('/');
  }
  
  return (<>
    <Head>
      <title>{"Intentify | Settings"}</title>
    </Head>
    <SettingsCard/>
    </>)
}

export default Settings;