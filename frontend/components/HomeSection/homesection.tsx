"use client";

import React, { useEffect, useState } from 'react';
import AuthHome from './AuthHome/authhome';
import GuestHome from './GuestHome/guesthome';
import Loading from '@/app/loading';

interface HomeSectionProps {
  auth: boolean;
}

const HomeSection = ({ auth }: HomeSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return ( auth ? <AuthHome/> : <GuestHome/>
  )
}

export default HomeSection