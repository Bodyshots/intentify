"use client"

import { AuthSidebar } from "./AuthSidebar/authsidebar";
import { GuestSidebar } from "./GuestSidebar/guestsidebar";
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export function AppSidebar() {
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return ( auth ? <AuthSidebar/> : <GuestSidebar/> )
}
