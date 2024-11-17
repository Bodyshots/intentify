import React from 'react'
import { AboutCard } from '@/components/AboutCard/aboutcard'
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Intentify | About us';

  return {
    title: pageTitle,
  };
}

function About() {
  return (<AboutCard/>)
}

export default About