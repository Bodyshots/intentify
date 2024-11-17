import React from 'react';
import { Metadata } from 'next'
import RegisterContainer from '@/components/RegisterContainer/registercontainer'
import './register.css'

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | Register';

  return {
    title: pageTitle,
  };
}

function Register() {
  return (
    <RegisterContainer/>
  );
}

export default Register