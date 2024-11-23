import React from 'react';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import AuthHomeGreetings from './AuthHomeGreeting/authhomegreetings';
import './authhome.css'

const AuthHome = () => {

  return (
    <div className="flex flex-col flex-nowrap w-full justify-between items-center p-4 py-8 pt-0 px-12">
      <div className="auth_title_container relative top-0 w-full py-4">
        <SiteFullTitle sloganClass='text-2xl' titleClass='text-6xl'/>
      </div>
      <div className="flex flex-col justify-evenly">
        <AuthHomeGreetings/>
      </div>
        <div className="flex flex-col p-16 justify-evenly auth_search_container items-center">
          <div className="home_search_text text-center pb-16 text-5xl font-medium">
              Ready to try out another URL?
          </div>
          <video 
            preload="auto"
            autoPlay
            loop
            muted
            className="rounded-3xl aspect-auto shadow-2xl border-1 md:border-1 border-base-content/20 xl:w-[50%] justify-center">
            <source src="/intentify_trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col text-center p-16">
          <h1 className="text-5xl">More features coming soon</h1>
          <h3 className="text-xl py-4 subtitle">Check back some other time to see what's here!</h3>
        </div>
      </div>
  )
}

export default AuthHome