"use client";

import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm/loginform';
import Testimonials from '../Testimonials/testimonials'
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { toast } from 'sonner';
import { ErrorConstants } from '@/constants/errors';
import './logincontainer.css'

const LoginContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  useEffect(() => {
    setIsLoaded(true);
    if (auth) {
      toast.error(ErrorConstants.AUTH_GUEST);
      redirect('/'); // Redirect authenticated users
    }
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="login_container flex flex-wrap lg:w-full flex-row justify-evenly p-8 m-auto items-stretch">
      <div className="flex flex-wrap lg:w-1/2 flex-row items-center justify-evenly p-8">
        <LoginForm/>
      </div>
      <div className="flex flex-wrap w-1/2 flex-row items-center justify-evenly p-8 h-full disappear_carousel">
        <Testimonials className_add='lg:px-2 py-8'/>
      </div>
    </div>
  )
}

export default LoginContainer