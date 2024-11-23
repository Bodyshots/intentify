"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Quote } from 'lucide-react';

const testimonials = [ {
  header: 'A Game Changer for Understanding User Behavior',
  body: `Intentify has completely transformed how we interpreted visitor intent!
         With just a URL, it helped us in tailoring our content and marketing strategies.
         Our conversion rate has never been higher!`,
  speaker: `Amanda Romero`,
  role: `Digital Marketing Specialist`
},
{
  header: 'Saves Time and Delivers Targeted Insights!',
  body: `Knowing why users visit our site has always been a guessing game.
         But with Intentify, we've finally been able to stop guessing and start strategizing.
         A must have for any UI/UX designer!`,
  speaker: `James Timothy`,
  role: `Content Strategist`
},
{
  header: 'Invaluable for E-commerce Optimization!',
  body: `We tried Intentify on our e-commerce platform, and we were dumbfounded!
        Our customers are finding what they need faster, and we're seeing a boost in sales!`,
  speaker: `Lily Kennedy`,
  role: `E-commerce Manager`
},
{
  header: 'A Digital Mind-Reader...',
  body: `Every URL we analyze with Intentify tells us so much about our users before they even
         interact with the site. It's almost like having a digital mind-reader that predicts what every
         visitor needs.`,
  speaker: `Tom Simion`,
  role: `Product Manager`
},
{
  header: 'The Missing Puzzle Piece to User Intent',
  body: `Understanding visitor intent was our missing piece, and Intentify fit perfectly.
         Highly recommended for anyone serious about user experience!`,
  speaker: `Emily Morgan`,
  role: `UX Designer`
},
{
  header: 'Unbelievably Accurate and Easy to Use!',
  body: `Not only does Intentify give highly accurate intent insights,
         but the interface makes it easy for our team to understand and
         apply these insights quickly`,
  speaker: `Sarah Lee`,
  role: `SEO Analyst`
}
]

interface TestimonialsProps {
  className_add?: string;
}

function Testimonials({className_add}: TestimonialsProps) {

  return (
    <div className={`flex text-center justify-center align-center w-full
        ${className_add ? className_add : ''}
        disappear_carousel`}>
      <Carousel className="w-full lg:max-w-3xl max-w-2xl"
                opts={{loop: true}}
                plugins={[Autoplay({delay: 5000})]}>
      <CarouselContent>
        {testimonials.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
            <Card className="flex justify-center flex-col items-center gap-4 bg-transparent border-0 shadow-none">
              <Quote />
              <CardTitle>{item.header}</CardTitle>
              <CardContent className="flex items-center justify-center p-6 max-w-lg">
                <span className="text-3xl break-words">{item.body}</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start w-full">
                <span className="card_speaker">{item.speaker}</span>
                <span className="card_role">{item.role}</span>
              </CardFooter>
            </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Testimonials