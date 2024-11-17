"use client";

import React, { useEffect } from 'react'
import RegisterForm from './RegisterForm/registerform'
import Testimonials from '../Testimonials/testimonials'
import { useState } from 'react';
import Loading from '@/app/loading';

const RegisterContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="register_container flex flex-wrap lg:w-full flex-row justify-evenly p-8 m-auto items-stretch">
      <div className="register_sec flex flex-wrap flex-row items-center justify-between p-8 w-full lg:h-full">
        <RegisterForm />
      </div>
      <div className="flex flex-wrap w-1/2 flex-row items-center justify-evenly p-12 h-full disappear_carousel">
        <Testimonials className_add='px-2 py-8'/>
      </div>
    </div>
  )
}

export default RegisterContainer