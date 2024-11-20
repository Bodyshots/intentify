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

  useEffect(() => {
    async function create_user() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/botpress/create/user`, {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        console.log(response);
        console.log(data);
        if (response.ok) {
          console.log("User created")
        }
        else {
          console.log("Response not ok")
        }
      }
      catch (error) {
        console.error("Error in create_user", error);
      }
    }

    create_user();

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