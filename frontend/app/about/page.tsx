import React from 'react'
import { AboutCard } from '@/components/AboutCard/aboutcard'
import Head from 'next/head'

function About() {
  return (<>
    <Head>
      <title>{"Intentify | About us"}</title>
    </Head>
    <AboutCard/>
    </>)
}

export default About