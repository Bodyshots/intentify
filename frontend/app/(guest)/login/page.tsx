import React from 'react'
import LoginForm from '@/components/LoginForm/loginform'
import Testimonials from '@/components/Testimonials/testimonials'
import './loginpage.css'
import Head from 'next/head'

async function Login() {

  return (
  (<>
  <Head>
    <title>{"Intentify | Login"}</title>
  </Head>
    <div className="login_container flex flex-wrap lg:h-full lg:w-full flex-row items-center p-8 h-full w-full">
      <LoginForm className_add='w-9/12'/>
      <Testimonials className_add='lg:px-2 py-8 testimonials_register'/>
    </div>
  </>))
}

export default Login