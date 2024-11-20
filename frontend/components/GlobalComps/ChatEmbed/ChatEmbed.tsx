"use client"
import Script from "next/script";

export function ChatEmbed() {
  return (
      <>
        <Script src="https://cdn.botpress.cloud/webchat/v2/inject.js"/>
        <Script src="https://mediafiles.botpress.cloud/52345432-5432543-5435-435545434/webchat/v2/config.js"/>
      </>
  );
};
