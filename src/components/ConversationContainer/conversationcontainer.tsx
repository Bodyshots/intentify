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
    <div className="prompt_container flex gap-4 flex-col justify-center m-auto">
      test
    </div>
  )
}

export default ConversationContainer