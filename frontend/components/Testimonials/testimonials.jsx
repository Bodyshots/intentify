"use client"

import React from 'react';
import './testimonials.css'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Quote } from 'lucide-react';

function Testimonials() {

  return (
    <div className="testimonial_container">
      <Carousel className="w-full max-w-xs"
                opts={{loop: true}}
                plugins={[Autoplay({delay: 5000})]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="flex justify-center flex-col items-center gap-6 bg-transparent border-0 shadow-none">
                <Quote/>
                <CardTitle>title</CardTitle>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-xl">dasdsadasdsa</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start w-full">
                  <span className="card_speaker">speaker</span>
                  <span className="card_role">role</span>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Testimonials