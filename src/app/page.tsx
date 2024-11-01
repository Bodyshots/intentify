"use client"

import React, { useEffect, useState } from 'react'

function page() {

  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
    .then((response) => response.json())
    .then((data) => {
        setMsg(data.msg);
    });
  }, []);

  return (
    <div>{msg}</div>
  )
}

export default page