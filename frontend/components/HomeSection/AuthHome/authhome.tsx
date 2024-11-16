import React from 'react'

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/store';
import './authhome.css'
import AuthHomeGreetings from './AuthHomeGreeting/authhomegreetings';

const AuthHome = () => {
  const names = useAppSelector((state) => state.name_persist.name_reduce);

  return (
    <div className="flex flex-col flex-nowrap w-full justify-between items-center p-4 py-8">
      <div className="relative top-0">
        <SiteFullTitle sloganClass='text-2xl' titleClass='text-6xl'/>
      </div>
      <div className="h-full">
        <AuthHomeGreetings/>
      <div>
        <div className="home_search_text text-center p-4 text-4xl">
            Ready to try out another URL?
          </div>
          <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                      onSubmit={(e) => console.log(e)}/>
        </div>
      </div>
    </div>
  )
}

export default AuthHome