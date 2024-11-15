import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideProps } from 'lucide-react';
import './guesthomecard.css'

interface GuestHomeCardProps {
  step_title: string;
  Icon: React.ComponentType<LucideProps>;
  desc: string;
}

const GuestHomeCard = ({ step_title, Icon, desc }: GuestHomeCardProps) => {
  return (
    <Card className="w-auto">
      <CardHeader className="flex flex-row text-wrap justify-center align-middle">
        <Icon size={50} 
              className='bg-[#d9f1df] rounded-xl p-1'
              style={{color: "black"}}/>
      </CardHeader>
      <CardContent>
      <div className="pb-2">{step_title}</div>
        <CardDescription>
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default GuestHomeCard