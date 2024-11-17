"use client"

import React from 'react'
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input'

const IntentifierSearch = () => {
  return (
    <div className="flex flex-col gap-y-8">
        <span className="text-6xl flex justify-center text-center w-7/12 mx-auto">Type in a URL to see how our chatbots will identify what you're looking for</span>
        <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                    onSubmit={(e) => console.log(e)}/>
    </div>
  )
}

export default IntentifierSearch