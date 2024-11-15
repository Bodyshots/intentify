"use client"

import React from 'react'
import IdentifierBar from '@/components/IdentifierBar/intentifierbar'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import './intentifier.css'
import Head from 'next/head'

function Intentifier() {
  return (<>
  <Head>
    <title>{"Intentify | Intentifier"}</title>
  </Head>
    <div className="prompt_container flex gap-4 flex-col justify-center m-auto">
      <span className="py-3"><IdentifierBar/></span>
      <div className="flex flex-col gap-y-8">
        <span className="text-6xl flex justify-center text-center w-7/12 mx-auto">Type in a URL to see how our chatbots will identify what you're looking for</span>
        <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                    onSubmit={(e) => console.log(e)}/>
      </div>
    </div>
    </>)
}

export default Intentifier