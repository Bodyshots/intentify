"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import getCSRF from "@/lib/GetCSRF";
import useSWR from "swr";
import { useAppDispatch } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";

const fetcher = async () => {
  const csrf_token = await getCSRF();
  const dispatch = useAppDispatch();

  try {
    const response = await fetch('http://localhost:4000/logout', {
      method: "POST",
      headers: {
        "X-CSRFToken": csrf_token,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data.message);  // Optionally handle the response
    if (response.ok) {
      dispatch(setAuth(false));
    }
  } catch (error) {
    console.error('Error logging out', error);
  }
}

function LogoutComp() {
  const { data, error } = useSWR("logout", fetcher);
  const { push } = useRouter();

  if (error || !data) {
    console.error("Error checking logging out: ", error);
  }
  else {
    push('/');
  }

  return null;
}

export default LogoutComp;
