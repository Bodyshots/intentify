"use client"

import React from 'react'
import LoginForm from '@/components/LoginForm/loginform'
import Testimonials from '@/components/Testimonials/testimonials'
import './loginpage.css'
import Head from 'next/head'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

function Login() {
  const { isAuth } = useAuth();
  if (isAuth) {
    redirect('/');
  }

  return (<>
  <Head>
    <title>{"Intentify | Login"}</title>
  </Head>
    <div className="login_container">
      <LoginForm/>
      <Testimonials className_add='px-6'/>
    </div>
    </>)
}

export default Login