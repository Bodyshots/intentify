import React from 'react'
import RegisterForm from '@/components/RegisterForm/registerform'
import './registerpage.css'
import Testimonials from '@/components/Testimonials/testimonials'
import Head from 'next/head'

function Register() {

  return (
  (<>
  <Head>
    <title>{"Intentify | Register"}</title>
  </Head>
    <div className="register_container">
      <RegisterForm/>
      <Testimonials className_add='px-6'/>
    </div>
  </>))
}

export default Register