import React from 'react'
import { Metadata } from 'next'
import IntentifierContainer from '@/components/IntentifierContainer/intentifiercontainer'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Conversations';

  return {
    title: pageTitle,
  };
}

function Conversations() {
  return (<IntentifierContainer/>)
}

export default Conversations