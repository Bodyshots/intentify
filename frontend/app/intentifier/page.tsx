"use client"

import React from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import './intentifier.css'

function Intentifier() {
  return (
    <div className="prompt_container flex gap-8 flex-col justify-center m-auto">
      <span className="text-6xl flex justify-center text-center w-7/12 mx-auto">Enter your URL to see what impressions people will get from your website</span>
      <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                  onSubmit={(e) => console.log(e)}/>
    </div>
  )
}

export default Intentifier