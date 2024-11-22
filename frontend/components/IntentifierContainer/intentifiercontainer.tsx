"use client";

import React, { useEffect, useState } from 'react'
import IdentifierBar from '../IdentifierBar/intentifierbar'
import IntentifierSearch from '../IntentifierSearch/intentifiersearch'
import Loading from '@/app/loading';
const IntentifierContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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