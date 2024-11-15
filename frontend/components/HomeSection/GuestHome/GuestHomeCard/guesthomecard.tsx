import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import './guesthomecard.css'

interface GuestHomeCardProps {
  step_title: string;
  Icon: React.ComponentType;
  desc: string;
}

const GuestHomeCard = ({ step_title, Icon, desc }: GuestHomeCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row">
        <Icon/>
        <CardTitle>{step_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default GuestHomeCard