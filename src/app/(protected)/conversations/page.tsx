import React from 'react'
import { Metadata } from 'next'
import ConversationContainer from '@/components/ConversationContainer/conversationcontainer'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Conversations';

  return {
    title: pageTitle,
  };
}

function Conversations() {
  return (<ConversationContainer/>)
}

export default Conversations