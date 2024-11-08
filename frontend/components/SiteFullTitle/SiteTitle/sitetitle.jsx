"use client"

import { UserRoundSearchIcon } from "lucide-react"
import '../sitefulltitle.css'

export default function SiteTitle() {

  return (<div className="flex flex-row gap-x-3 text-center justify-center font-semibold title_text">
            <UserRoundSearchIcon className="logo_container title_text"/>Intentify
          </div>)
}