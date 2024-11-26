"use client";

import React, { use, useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { ErrorConstants } from '@/constants/errors';
import { fetchConversations } from '@/redux/slices/convoSlice';
import getCSRF from '@/lib/GetCSRF';

const ConversationContainer = () => {
  const csrfToken = getCSRF();
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAppSelector((state) => state.auth_persist.auth);
  const email = useAppSelector((state) => state.email_persist.email);
  const convos = useAppSelector((state) => state.convos_persist.convos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      toast.error(ErrorConstants.AUTH_PROTECTED);
      redirect('/'); // Redirect unauthenticated users
    }
    console.log("Dispatching fetchConversations");
    dispatch(fetchConversations({ email, csrfToken }));
    console.log(convos);
  
    setIsLoaded(true);
  }, [email, csrfToken]);
  
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