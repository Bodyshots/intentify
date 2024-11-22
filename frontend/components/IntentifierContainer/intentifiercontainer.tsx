"use client";

import React, { useEffect, useState } from 'react'
import IdentifierBar from '../IdentifierBar/intentifierbar'
import IntentifierSearch from '../IntentifierSearch/intentifiersearch'
import getCSRF from '@/lib/GetCSRF';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

const IntentifierContainer = () => {
  const csrfToken = getCSRF();
  const [isLoaded, setIsLoaded] = useState(false);
  const { email } = useContext(AuthContext) ?? {};
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const botURL = "https://webhook.botpress.cloud/8e34375f-abc8-4f1e-9d5b-98398c99dbdb"

  useEffect(() => {
    async function send_email() {
      try {
        const response = await fetch(`${botURL}`, {
          method: 'POST',
          body: JSON.stringify({
            email: email
          })
        });
        const data = await response.json();

        if (response.ok) {
          console.log("Email sent to bot")
        }
        else {
          console.log("Response not ok")
        }
      }
      catch (error) {
        console.error("Error in send_email", error);
      }
    }

    send_email();

    setIsLoaded(true);
  }, []);
  
  if (!isLoaded) {
    return <Loading/>
  }

  return (
    <div className="prompt_container flex gap-4 flex-col justify-center m-auto">
      <span className="py-3"><IdentifierBar/></span>
      <IntentifierSearch/>
    </div>
  )
}

export default IntentifierContainer