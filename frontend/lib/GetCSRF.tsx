"use client";

import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:4000/api/get-csrf-token",
    { 
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export default function getCSRF() {
  const { data, error } = useSWR('CSRF', fetcher)

  if (error) {
    console.error("Error getting CSRF token: ", error);
    return null;
  }
  if (!data) return null;

  return data.csrf_token;
}