"use client"

import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <MagnifyingGlass
          visible={true}
          ariaLabel="magnifying-glass-loading"
          width="10em"
          height="10em"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="transparent"
          color="rgb(47, 208, 74)"
        />
        <span className="mt-4 text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
};


export default Loading;