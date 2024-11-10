"use client"

import SiteSlogan from './SiteSlogan/siteslogan'
import SiteTitle from './SiteTitle/sitetitle'

interface SiteFullTitleProps {
  titleClass: string;
  sloganClass: string;
}

export default function SiteFullTitle({ titleClass, sloganClass }: SiteFullTitleProps) {

  return (<div className="gap-0">
          <span className={titleClass}><SiteTitle/></span>
          <span className={sloganClass}><SiteSlogan/></span>
          </div>)
}
