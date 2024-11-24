"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";
import useSWR from "swr";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchCSRFToken = async () => {
  const res = await fetch(`${apiBaseUrl}/api/get-csrf-token`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json();
  return data.csrf_token;
};

function Logout() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);
  const { data: csrfToken } = useSWR("csrf-token", fetchCSRFToken);
  const logoutBegin = useRef(false); // Tracks whether logout has already started
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!auth) {
      toast.error("You must be signed in to access this page!");
      redirect('/'); // Redirect unauthenticated users
    }

    const handleLogout = async () => {
      if (!csrfToken || !auth || logoutBegin.current) return;

      logoutBegin.current = true; // Prevent further logout triggers

      try {
        const response = await fetch("http://localhost:4000/logout", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          dispatch(setAuth(false));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error during logout process", error);
        toast.error("Error during logout process");
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