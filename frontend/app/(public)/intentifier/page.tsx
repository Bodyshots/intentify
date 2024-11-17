import React from 'react'
import IdentifierBar from '@/components/IdentifierBar/intentifierbar'
import { Metadata } from 'next'
import IntentifierSearch from '@/components/IntentifierSearch/intentifiersearch'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Intentifier';

  return {
    title: pageTitle,
  };
}

function Intentifier() {
  return (
    <div className="prompt_container flex gap-4 flex-col justify-center m-auto">
      <span className="py-3"><IdentifierBar/></span>
      <IntentifierSearch/>
    </div>
)
}

export default Intentifier