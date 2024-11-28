"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";
import useSWR from "swr";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import { ErrorConstants } from "@/constants/errors";
import { APIConstants } from "@/constants/api";
import { setUserID } from "@/redux/slices/userIDSlice";
import { setConversations } from "@/redux/slices/convoSlice";
import { setFirstName, setLastName } from "@/redux/slices/nameSlice";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchCSRFToken = async () => {
  const res = await fetch(`${apiBaseUrl}/api/get-csrf-token`, {
    method: APIConstants.GET,
    credentials: APIConstants.CRED_INCLUDE,
  });
  if (!res.ok) throw new Error(ErrorConstants.AUTH_PROTECTED);
  const data = await res.json();
  return data.csrf_token;
};

function Logout() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth_persist.auth);
  const { data: csrfToken } = useSWR("csrf-token", fetchCSRFToken);
  const logoutBegin = useRef(false); // Tracks whether logout has already started
  const [isLoaded, setIsLoaded] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!auth) {
      toast.error(ErrorConstants.AUTH_PROTECTED);
      redirect('/'); // Redirect unauthenticated users
    }

    const handleLogout = async () => {
      if (!csrfToken || !auth || logoutBegin.current) return;

      logoutBegin.current = true; // Prevent further logout triggers

      try {
        const response = await fetch(`${apiBaseUrl}/api/logout`, {
          method: APIConstants.POST,
          headers: {
            "X-CSRFToken": csrfToken,
          },
          credentials: APIConstants.CRED_INCLUDE,
        });
        const data = await response.json();

        if (response.ok) {
          dispatch(setAuth(false));
          dispatch(setUserID(-1));
          dispatch(setFirstName(''));
          dispatch(setLastName(''));
          dispatch(setConversations([]));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(ErrorConstants.LOGOUT, error);
        toast.error(ErrorConstants.LOGOUT);
      }

      redirect("/");
    };

    handleLogout();
    setIsLoaded(true);
  }, [csrfToken]);

  if (!isLoaded) {
    return <Loading />;
  }

  return null; // Component does not render anything visible
}

export default Logout;
