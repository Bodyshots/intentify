import Head from 'next/head'
import React from 'react'
import { SettingsCard } from '@/components/SettingsCard/settingscard'

function Settings() {
  return (
  (<>
    <Head>
      <title>{"Intentify | Settings"}</title>
    </Head>
    <SettingsCard/>
  </>))
}

export default Settings