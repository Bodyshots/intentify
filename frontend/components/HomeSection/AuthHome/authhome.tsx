import React from 'react'

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';

const AuthHome = () => {
  return (
    <div className="landing_container flex justify-center py-10 rounded-2xl">
      <div className="flex flex-col flex-wrap justify-evenly">
        <div className="search_hero_container gap-6 p-4 flex justify-center py-10">
          <SiteFullTitle titleClass='text-6xl' sloganClass='text-4xl'/>
          <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                      onSubmit={(e) => console.log(e)}/>
          <span className="text-xl">Type in a URL to see how customers may view your site</span>
        </div>
        <div className="big_text_hero_container flex flex-col gap-10 w-8/12 justify-center">
          <span className="text-6xl text-right justify-center pr-8">Get personalized impressions for your website, just for <b>you</b></span>
          <div className="flex flex-row gap-x-6 justify-center">
            <Button className="rounded-full text-lg border border-muted-foreground hover:bg-custom_green_hover dark:hover:bg-muted-foreground">Create an account</Button>
            <Button className="rounded-full text-bg-black bg-card text-lg border border-muted-foreground hover:bg-[color:--muted-secondary] dark:bg-sidebar dark:hover:bg-muted-foreground">Login</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthHome