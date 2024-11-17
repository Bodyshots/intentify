"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";
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
  const { data: csrfToken } = useSWR("csrf-token", fetchCSRFToken);
  const logoutBegin = useRef(false); // Tracks whether logout has already started

  useEffect(() => {
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

      push("/");
    };

    handleLogout();
  }, [csrfToken]);

  return null; // Component does not render anything visible
}

export default Logout;
