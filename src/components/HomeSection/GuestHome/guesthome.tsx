"use client";

import React from 'react'

import { useRouter } from 'next/navigation';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import { Button } from '@/components/ui/button';
import { Link, MessageCircleQuestion, SearchCheck, RefreshCcw } from 'lucide-react';
import './guesthome.css'
import GuestHomeCard from './GuestHomeCard/guesthomecard';

const cards = [
  {
    step_title: "1. Share a URL",
    Icon: Link,
    desc: "Enter a URL to kick off the conversation. Our chatbot will start exploring the site to personally understand you."
  },
  {
    step_title: "2. Answer Some Quick Questions",
    Icon: MessageCircleQuestion,
    desc: "Tell us more about what you're looking for! A few simple questions will help us understand your intent on this site."
  },
  {
    step_title: "3. Did We Guess Right?",
    Icon: SearchCheck,
    desc: "Our chatbot will give you a guess about why you're visiting. See if we're on the mark with our analysis!"
  },
  {
    step_title: "4. Keep Going or Try Again!",
    Icon: RefreshCcw,
    desc: "Not quite right? Feel free to explore more pages or answer a few more questions for a better guess!"
  }
]

const GuestHome = () => {
  const { push } = useRouter();
  
  return (
  <div className="flex flex-col justify-center text-center px-12 h-full">
    <div className="landing_container flex justify-center py-10 rounded-2xl w-full">
      <div className="hero_container flex flex-row justify-evenly flex-nowrap">
        <div className="w-9/12 text-center gap-6 p-4 flex justify-center py-10 pl-8 flex-col flex-nowrap items-center">
          <SiteFullTitle titleClass='text-6xl' sloganClass='text-4xl'/>
          <video 
            preload="auto"
            autoPlay
            loop
            muted
            className="rounded-3xl aspect-auto shadow-2xl w-full border-1 md:border-1 border-base-content/20 xl:w-[80%] justify-center">
            <source src="intentify_trailer.mp4"
                    type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="big_text_hero_container">
          <span className="text-6xl lg:text-right 2xl:text-7xl 4xl:text-9xl justify-center lg:pr-8">Have a chatbot guess what you're looking for on any website, just for <b>you</b></span>
          <div className="flex flex-row gap-x-6 justify-center lg:pr-8">
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
    <div style={{width: "95%"}} className="mx-auto px-auto py-6 my-4 h-auto">
      <h1 className="text-5xl">A few questions are all we need</h1>
      <h3 className="text-xl py-4 subtitle">How does it work?</h3>
        <div className="grid grid-cols-2 pt-2 gap-4 lg:grid-cols-4 sm:gap-8">
          {cards.map((item) => {
            return <GuestHomeCard step_title={item.step_title}
                                  Icon={item.Icon}
                                  desc={item.desc}
                                  key={item.step_title}/>
          })}
        </div>
    </div>
  </div>)
}

export default GuestHome