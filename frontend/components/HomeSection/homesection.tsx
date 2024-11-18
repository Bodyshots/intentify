"use client";

import React, { useEffect, useState } from 'react';
import AuthHome from './AuthHome/authhome';
import GuestHome from './GuestHome/guesthome';
import Loading from '@/app/loading';
import { useAppSelector } from '@/redux/store';

const HomeSection = () => {
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    if (auth === null) return;
    setIsLoaded(true);
  }, [auth]);

  if (!isLoaded) {
    return <Loading />;
  }

  return ( auth ? <AuthHome/> : <GuestHome/>
  )
}

export default HomeSection