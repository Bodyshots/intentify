"use client"

import React, { useEffect, useState } from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';
import './home.css'

function Home() {

  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    document.title = "Intentify | Home"
  }, []);

  return (
    <div className="landing_container flex justify-center py-11 rounded-2xl">
      <div className="flex flex-row justify-evenly">
        <div className="search_hero_container gap-6 p-4 flex justify-center py-10">
          {SiteFullTitle(7, 4)}
          <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                      onSubmit={(e) => console.log(e)}/>
          <span className="text-xl">Type in a URL to see how customers may view your site</span>
        </div>
        <div className="big_text_hero_container flex flex-col gap-10 w-8/12 justify-center">
          <span className="text-7xl text-right justify-center pr-16">Get personalized impressions for your website, just for <b>you</b></span>
          <div className="flex flex-row gap-x-6 justify-center">
            <Button className="rounded-full text-lg border border-sidebar-primary">Create an account</Button>
            <Button className="rounded-full text-lg border border-sidebar-primary">Log in</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home