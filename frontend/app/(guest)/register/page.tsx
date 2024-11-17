import React from 'react'
import RegisterForm from '@/components/RegisterForm/registerform'
import Testimonials from '@/components/Testimonials/testimonials'
import { Metadata } from 'next'
import './register.css'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Register';

  return {
    title: pageTitle,
  };
}

function Register() {
  return (
    <div className="register_container flex flex-wrap lg:w-full flex-row justify-evenly p-8 m-auto items-stretch">
      <div className="register_sec flex flex-wrap flex-row items-center justify-between p-8 w-full lg:h-full">
        <RegisterForm />
      </div>
      <div className="disappear_carousel flex flex-wrap w-1/2 flex-row items-center justify-evenly p-12 h-full">
        <Testimonials className_add='px-2 py-8'/>
      </div>
    </div>
  );
}

export default Register