"use client";

import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { ErrorConstants } from '@/constants/errors';
import getCSRF from '@/lib/GetCSRF';
import ConvoItem from './ConvoItem/convoitem';
import { fetchConversations } from '@/redux/slices/convoSlice';

const ConversationContainer = () => {
  const csrfToken = getCSRF();
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAppSelector((state) => state.auth_persist.auth);
  const email = useAppSelector((state) => state.email_persist.email);
  const convos = useAppSelector((state) => state.convos_persist.convos)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      toast.error(ErrorConstants.AUTH_PROTECTED);
      redirect('/');
    }
    dispatch(fetchConversations({email, csrfToken})).finally(() => setIsLoaded(true));
  }, [csrfToken]);

  if (!isLoaded) {
    return <Loading/>
  }

  return ( convos.length ?
    <div className="flex flex-col text-center p-8 w-full justify-center convo_page pr-16">
    <h1 className="text-6xl font-normal">Your Conversations</h1>
    <div className="convo_container flex flex-col justify-center my-8">
      {/* Header Row */}
      <div className="p-6 flex flex-row justify-between items-center gap-4 border rounded-lg rounded-bl-none rounded-br-none border-gray-300">
      <span className="convo_date w-1/6 text-sm flex-shrink-0">Conversation #</span>
        <span className="convo_date w-1/6 text-sm flex-shrink-0">Date</span>
        <span className="convo_urls w-1/6 text-sm flex-shrink-0">URLs</span>
        <span className="convo_role w-1/6 text-sm flex-shrink-0">Predicted Role</span>
        <span className="convo_intent w-1/6 text-sm overflow-hidden break-words">Predicted Intention</span>
        <span className="convo_delete w-1/6 text-sm flex justify-center"></span>
      </div>

      {/* Conversations */}
      <div className="flex flex-col justify-center">
        {convos && convos.map((convo, index) => (
          <ConvoItem key={index} convo={convo} index={index} />
        ))}
      </div>
    </div>
  </div>
  :
  <div className="flex flex-col text-center p-16 w-full justify-center">
    <h1 className="text-6xl font-normal">Hmm... There's nothing here!</h1>
    <h3 className="text-xl py-4 subtitle">Chat with our chatbots to save your conversations here!</h3>
  </div>)
}

export default ConversationContainer