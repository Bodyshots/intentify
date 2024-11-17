import React from 'react'

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';
import AuthHomeGreetings from './AuthHomeGreeting/authhomegreetings';
import './authhome.css'

const AuthHome = () => {

  return (
    <div className="flex flex-col flex-nowrap w-full justify-between items-center p-4 py-8 pt-0">
      <div className="auth_title_container relative top-0 w-full pt-8">
        <SiteFullTitle sloganClass='text-2xl' titleClass='text-6xl'/>
      </div>
      <div className="h-full">
        <AuthHomeGreetings/>
      <div className="flex flex-col justify-center p-8 auth_search_container">
        <div className="home_search_text text-center p-4 text-4xl">
            Ready to try out another URL?
          </div>
          <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                      onSubmit={(e) => console.log(e)}/>
          <span className="text-xl text-center pt-4">Type in a URL to see how our chatbots will identify what you're looking for</span>
        </div>
      </div>
    </div>
  )
}

export default AuthHome