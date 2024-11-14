"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/redux/store";
import useSWR from "swr";

const fetchCSRFToken = async () => {
  const res = await fetch("http://localhost:4000/api/get-csrf-token", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json();
  return data.csrf_token;
};

function Logout() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const auth = useAppSelector((state) => state.auth_persist.auth_reduce.auth);

  // Use SWR to get the CSRF token
  const { data: csrfToken } = useSWR("csrf-token", fetchCSRFToken);

  useEffect(() => {
    const handleLogout = async () => {
      if (!csrfToken && auth) return; // Wait for the CSRF token
      try {
        const response = await fetch('http://localhost:4000/logout',
          {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
        });
        if (response.ok) {
          dispatch(setAuth(false));
        }
      }
      catch (error) {
        console.error("Error during logout process", error);
      }
      push('/');
    };

    handleLogout(); // Trigger logout once CSRF token is available
  }, [csrfToken]);
}

export default Logout;
