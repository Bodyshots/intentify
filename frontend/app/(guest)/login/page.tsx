import React from 'react'
import LoginForm from '@/components/LoginForm/loginform'
import Testimonials from '@/components/Testimonials/testimonials'
import './login.css'
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Login';

  return {
    title: pageTitle,
  };
}

async function Login() {

  return (
    <div className="login_container flex flex-wrap lg:w-full flex-row justify-evenly p-8 m-auto items-stretch">
      <div className="flex flex-wrap lg:w-1/2 flex-row items-center justify-evenly p-8">
        <LoginForm/>
      </div>
      <div className="carousel_sec disappear_carousel flex flex-wrap w-1/2 flex-row items-center justify-evenly p-8 h-full">
        <Testimonials className_add='lg:px-2 py-8'/>
      </div>
    </div>
  )
}

export default Login