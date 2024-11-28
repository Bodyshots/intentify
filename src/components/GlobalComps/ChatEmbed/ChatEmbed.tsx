"use client"
import Script from "next/script";

export function ChatEmbed() {
  return (
    <>
      <Script 
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" 
      />
      <Script 
        src="https://files.bpcontent.cloud/2024/11/26/21/20241126213005-ZPOC32I2.js" 
        strategy="lazyOnload"
      />
    </>
  );
}

