"use client"

import { UserRoundSearchIcon } from "lucide-react"

export default function SiteTitle() {

  return (<div className="flex flex-row gap-x-3 text-center justify-center font-semibold title_text">
            <UserRoundSearchIcon className="h-auto"
                                 style={{color: "hsl(130, 63%, 50%)",
                                         width: "1em",
                                         minWidth: "1em"}}
            />
            Intentify
          </div>)
}