"use client"

import React, { useEffect, useState } from 'react'
import SiteTitle from '@/components/SiteFullTitle/SiteTitle/sitetitle';
import SiteSlogan from '@/components/SiteFullTitle/SiteSlogan/siteslogan';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import SiteFullTitle from '@/components/SiteFullTitle/sitefulltitle';
import './home.css'

const placeholders = ["https://www.apple.com/",
                      "https://www.microsoft.com/en-ca",
                      "https://www.amazon.ca/",
                      "https://www.youtube.com/"]


function Home() {

  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    document.title = "Intentify | Home"
  }, []);

  return (
    <div className="landing_container">
      <div>
        <SiteFullTitle/>
        <PlaceholdersAndVanishInput placeholders={placeholders}
                                    onChange={(e) => console.log(e)}
                                    onSubmit={(e) => console.log(e)}/>
        <span className="text-3xl">instructions</span>
        whoa
      </div>
      test
    </div>
  )
}

export default Home