"use client";

import React from 'react'
import { ModeToggle } from './ModeToggle/modetoggle'
import { AppSidebar } from './AppSidebar/appsidebar'
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';
import { ChatEmbed } from './ChatEmbed/ChatEmbed';

const GlobalComps = () => {
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (<>
    <AppSidebar/>
    <ChatEmbed/>
  </>)
}

export default GlobalComps