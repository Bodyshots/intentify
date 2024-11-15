import React from 'react'
import LoginForm from '@/components/LoginForm/loginform'
import Testimonials from '@/components/Testimonials/testimonials'
import './loginpage.css'
import Head from 'next/head'

function Login() {

  return (
  (<>
  <Head>
    <title>{"Intentify | Login"}</title>
  </Head>
    <div className="login_container flex flex-wrap lg:pt-24 lg:h-full lg:w-full flex-row items-center justify-evenly p-8">
      <LoginForm/>
      <Testimonials className_add='lg:px-2 py-8'/>
    </div>
  </>))
}

export default Login