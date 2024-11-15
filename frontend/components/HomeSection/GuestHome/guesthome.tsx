"use client";

import React from 'react'

import { useRouter } from 'next/navigation';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, MessageCircleQuestion, SearchCheck, RefreshCcw } from 'lucide-react';
import './guesthome.css'
import GuestHomeCard from './GuestHomeCard/guesthomecard';

const cards = [
  {
    step_title: "1. Input a URL",
    Icon: Link,
    desc: "idk"
  },
  {
    step_title: "2. Answer some questions",
    Icon: MessageCircleQuestion,
    desc: "idk 2"
  },
  {
    step_title: "3. Did we get what you're looking for?",
    Icon: SearchCheck,
    desc: "idk 3"
  },
  {
    step_title: "4. If not, let's try again!",
    Icon: RefreshCcw,
    desc: "idk 4"
  }
]

const GuestHome = () => {
  const { push } = useRouter();
  
  return (
  <div className="flex flex-col justify-center text-center">
    <div className="landing_container flex justify-center py-10 rounded-2xl w-full">
      <div className="flex flex-row justify-evenly">
        <div className="search_hero_container gap-6 p-4 flex justify-center py-10">
          <SiteFullTitle titleClass='text-6xl' sloganClass='text-4xl'/>
          <PlaceholdersAndVanishInput onChange={(e) => console.log(e)}
                                      onSubmit={(e) => console.log(e)}/>
          <span className="text-xl">Type in a URL to see how our chatbots will identify what you're looking for</span>
        </div>
        <div className="big_text_hero_container flex flex-col gap-10 w-8/12 justify-center">
          <span className="text-6xl text-right justify-center pr-8">Have a chatbot guess what you're looking for on any website, just for <b>you</b></span>
          <div className="flex flex-row gap-x-6 justify-center pr-8">
            <Button className="rounded-full text-lg border border-muted-foreground hover:bg-custom_green_hover dark:hover:bg-muted-foreground"
                    onClick={() => push('/register')}>
              Create an account
            </Button>
            <Button className="rounded-full text-bg-black bg-card text-lg border border-muted-foreground hover:bg-[color:--muted-secondary] dark:bg-sidebar dark:hover:bg-muted-foreground"
                    onClick={() => push('/login')}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div className="py-6 my-4">
      <h1 className="text-5xl">A few questions are all we need</h1>
      <h3 className="text-xl py-4" id="first_subtitle">How does it work?</h3>
        <div className="flex flex-row">
          {cards.map((item) => {
            return <GuestHomeCard step_title={item.step_title}
                                  Icon={item.Icon}
                                  desc={item.desc}/>
          })}
        </div>
    </div>
  </div>)
}

export default GuestHome