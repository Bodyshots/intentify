"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function Logout() {
  const { push } = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/get-csrf-token", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        const request: RequestInit = {
          method: "POST",
          headers: {
            "X-CSRFToken": data.csrf_token,
          },
          credentials: "include",
        };

        // Attempt to log out and redirect
        if (await logout(request)) {
          push("/"); // Redirect to home if logout is successful
        } else {
          console.log("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout process", error);
      }
    };

    handleLogout(); // Call the async function
  }, []);

  return null; // No need to render anything
}

export default Logout;
