"use client"

import { AuthSidebar } from "./AuthSidebar/authsidebar";
import { GuestSidebar } from "./GuestSidebar/guestsidebar";
import { useAppSelector } from '@/redux/store';

export function AppSidebar() {
  const auth = useAppSelector((state) => state.auth_persist.auth);

  return ( auth ? <AuthSidebar/> : <GuestSidebar/> )
}
