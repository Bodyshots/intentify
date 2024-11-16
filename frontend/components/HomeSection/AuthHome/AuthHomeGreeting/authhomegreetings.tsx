import React from 'react'
import { useAppSelector } from '@/redux/store';

const greetings = ["Hello again", "Welcome back", "Good to see you"]

const AuthHomeGreetings = () => {
  const names = useAppSelector((state) => state.name_persist.name_reduce);
  console.log(names.firstName);
  console.log(names.lastName);

  return (
    <div className="flex greeting_sec text-7xl text-center w-full h-auto justify-center items-center">
      {greetings[Math.floor(Math.random() * greetings.length)] + (names.firstName ? 
                                                                 (", " + 
                                                                 (names.firstName) +
                                                                 (names.lastName ? (" " + names.lastName) : "")) +
                                                                 "!": "!").trim()}
    </div>
  )
}

export default AuthHomeGreetings