import React from 'react'
import { useAppSelector } from '@/redux/store';
import './authhomegreetings.css'

const greetings = ["Hello again", "Welcome back", 
                   "Good to see you", "Hey there",
                   "Long time no see", "Great to have you back"]

const AuthHomeGreetings = () => {
  const names = useAppSelector((state) => state.name_persist);

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