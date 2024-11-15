import React from 'react'
import AuthHome from './AuthHome/authhome';
import GuestHome from './GuestHome/guesthome';

interface HomeSectionProps {
  auth: boolean;
}

const HomeSection = ({ auth }: HomeSectionProps) => {
  return ( auth ? <AuthHome/> : <GuestHome/>
  )
}

export default HomeSection