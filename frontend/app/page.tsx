"use client"

import React, { useEffect, useState } from 'react'

function page() {

  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    document.title = "Intentify | Home"
  }, []);

  return (
    <div>{msg}</div>
  )
}

export default page