"use client";

import React from 'react'
import { ModeToggle } from './ModeToggle/modetoggle'
import { AppSidebar } from './AppSidebar/appsidebar'
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';

const GlobalComps = () => {
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (<>
    <ModeToggle/>
    <AppSidebar/>
  </>)
}

export default GlobalComps