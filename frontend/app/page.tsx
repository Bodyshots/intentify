"use client"

import React, { useEffect, useState } from 'react'
import SiteTitle from '@/components/SiteFullTitle/SiteTitle/sitetitle';
import SiteSlogan from '@/components/SiteFullTitle/SiteSlogan/siteslogan';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import './home.css'

const placeholders = ["test1", "test2", "test3"]


function Home() {

  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    document.title = "Intentify | Home"
  }, []);

  return (
    <div className="landing_container">
      <div>
        <span className="text-5xl py-10"><SiteTitle/></span>
        <PlaceholdersAndVanishInput placeholders={placeholders}
                                    onChange={(e) => console.log(e)}
                                    onSubmit={(e) => console.log(e)}/>
        <span className="text-3xl"><SiteSlogan/></span>
        whoa
      </div>
      test
    </div>
  )
}

export default Home