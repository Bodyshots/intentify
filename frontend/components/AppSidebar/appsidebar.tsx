"use client"

import { AuthSidebar } from "./AuthSidebar/authsidebar";
import { GuestSidebar } from "./GuestSidebar/guestsidebar";
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import './appsidebar.css';

export function AppSidebar() {
  const [sideBar, setSideBar] = useState(<GuestSidebar/>);
  const { isAuth } = useAuth();

  useEffect(() => {
    setSideBar((isAuth) ? (<AuthSidebar/>) : (<GuestSidebar/>))
  }, [isAuth])

  return ( sideBar )
}
