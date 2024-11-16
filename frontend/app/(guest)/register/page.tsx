import React from 'react'
import RegisterForm from '@/components/RegisterForm/registerform'
import Testimonials from '@/components/Testimonials/testimonials'
import Head from 'next/head'
import './register.css'

function Register() {

  return (
  (<>
  <Head>
    <title>{"Intentify | Register"}</title>
  </Head>
    <div className="register_container flex flex-wrap lg:h-full lg:w-full flex-row items-center justify-evenly p-8">
      <RegisterForm/>
      <Testimonials className_add='lg:px-2 py-8'/>
    </div>
  </>))
}

export default Register