"use client"

import Head from 'next/head';
import HomeSection from '@/components/HomeSection/homesection';

import { useAppSelector } from '@/redux/store';

function Home() {
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  console.log("auth: " + auth);

  return (<>
    <Head>
      <title>{"Intentify | Home"}</title>
    </Head>
    <HomeSection auth={auth}/>
    </>)
}

export default Home