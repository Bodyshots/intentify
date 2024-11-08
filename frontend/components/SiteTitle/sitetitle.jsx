"use client"

import { UserRoundSearchIcon } from "lucide-react"
import './sitetitle.css'

export default function SiteTitle() {

  return (<div className="text-5xl flex justify-center h-max flex-col">
            <div className="flex flex-row gap-x-3 text-center justify-center font-semibold title_text">
              <UserRoundSearchIcon className="logo_container title_text"/>Intentify
            </div>
            <span className="text-2xl text-center p-4 title_text">What are <b>you</b> looking for?</span>
          </div>)
}
