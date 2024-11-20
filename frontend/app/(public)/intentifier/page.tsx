import React from 'react'
import { Metadata } from 'next'
import IntentifierContainer from '@/components/IntentifierContainer/intentifiercontainer'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Intentifier';

  return {
    title: pageTitle,
  };
}

function Intentifier() {
  return (<IntentifierContainer/>)
}

export default Intentifier