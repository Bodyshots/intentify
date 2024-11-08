"use client"

import SiteSlogan from './SiteSlogan/siteslogan'
import SiteTitle from './SiteTitle/sitetitle'

export default function SiteFullTitle() {

  return (<>
          <span className="text-5xl"><SiteTitle/></span>
          <span className="text-2xl"><SiteSlogan/></span>
          </>)
}
