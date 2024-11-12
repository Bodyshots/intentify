"use client";

import { AuthSidebar } from "./AuthSidebar/authsidebar";
import { GuestSidebar } from "./GuestSidebar/guestsidebar";
import { checkAuth } from "@/lib/checkauth";
import './appsidebar.css';
import { useState, useEffect } from "react";

export const AppSidebar = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuth();
      setIsAuth(authStatus);
    };

    fetchAuthStatus();
  }, []);

  if (isAuth === null) return null; // TODO: Loading spinner?

  return isAuth ? <AuthSidebar /> : <GuestSidebar />;
}
