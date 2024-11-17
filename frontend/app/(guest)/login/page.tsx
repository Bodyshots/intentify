import React from 'react'
import LoginContainer from '@/components/LoginContainer/logincontainer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Login';

  return {
    title: pageTitle,
  };
}

async function Login() {

  return (
    <LoginContainer/>
  )
}

export default Login