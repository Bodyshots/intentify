"use client"

import SiteSlogan from './SiteSlogan/siteslogan'
import SiteTitle from './SiteTitle/sitetitle'

export default function SiteFullTitle(title_size: number, slogan_size: number) {

  return (<div className="gap-0">
          <span className={"text-" + title_size + "xl"}><SiteTitle/></span>
          <span className={"text-" + slogan_size + "xl"}><SiteSlogan/></span>
          </div>)
}
