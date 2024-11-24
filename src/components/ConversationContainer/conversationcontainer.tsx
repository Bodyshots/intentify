"use client";

import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux/store';
import { ErrorConstants } from '@/constants/errors';

const ConversationContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  useEffect(() => {
    if (!auth) {
      toast.error(ErrorConstants.AUTH_PROTECTED);
      redirect('/'); // Redirect unauthenticated users
    }
    setIsLoaded(true);
  }, []);
  
  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <div className="flex flex-col text-center p-16 w-full justify-center">
      <h1 className="text-6xl font-normal">Under Construction</h1>
      <h3 className="text-xl py-4 subtitle">Check back to see what's here!</h3>
    </div>
  )
}

export default ConversationContainer