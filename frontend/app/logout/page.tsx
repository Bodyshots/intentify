"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Logout() {
  const { push }  = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/get-csrf-token",
      { method: "GET",
        credentials: "include",
       })
      .then((res) => res.json())
      .then((data) => {
        let request: RequestInit = {
          method: 'POST',
          headers: {
            'X-CSRFToken': data.csrf_token,
          },
          credentials: 'include',
        }

        fetch('http://localhost:4000/logout', request)
        .then(response => response.json()
        .then(data => ({
          data: data,
          response: response
        })).then(res => {
          if (res.response.ok) {
            push('/')
          }
          else {
            console.log("Something went wrong");
          }
        }))
      })
      .catch((err) => console.error("Error fetching CSRF token:", err));
  }, []);
  return;
}

export default Logout