import React from 'react'
import LoginForm from '@/components/LoginForm/loginform'
import Testimonials from '@/components/Testimonials/testimonials'
import './loginpage.css'

function Login() {
  return (
    <div className="login_container">
      <LoginForm/>
      <Testimonials className_add='px-6'/>
    </div>
  )
}

export default Login