// Code from https://www.youtube.com/watch?v=fx6KMItwJAw
"use client";

import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const SLEEP_DUR = 250

  const handleTrans = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(SLEEP_DUR);

    router.push(href);

    await sleep(SLEEP_DUR);

    body?.classList.remove("page-transition");
  };

  return (
    <Link href={href} {...props} onClick={handleTrans}>
      {children}
    </Link>
  )
}