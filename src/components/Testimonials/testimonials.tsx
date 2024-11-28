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
  header: `A game-changer for anyone who's curious about the web!`,
  body: `As a digital marketer, I'm always exploring new websites and trends, but Intentify has taken my browsing experience to a whole new level. 
  Highly recommend to anyone looking for a deeper, more personalized web experience!`,
  speaker: `Amanda Romero`,
  role: `Digital Marketing Specialist`
},
{
  header: `It's like having a personal assistant for my online research.`,
  body: `Intentify has completely revolutionized the way I conduct research.
  Instead of just skimming websites, I now have a tool that actively engages with me, helping me dig deeper into the content.
  It's really provides a fun way to reflect on why I'm visiting a page.`,
  speaker: `James Timothy`,
  role: `Content Strategist`
},
{
  header: 'Never knew a chatbot could be this smart!',
  body: `The chatbot isn't just asking generic questions-it's asking the right questions.
  It accurately identified my profession right off the bat, then offered me related content to explore.
  As someone in tech, I love that it can learn and adapt to my interests. This is the future of online interaction!`,
  speaker: `Lily Kennedy`,
  role: `Software Engineer`
},
{
  header: `I didn't realize I needed Intentify...`,
  body: `And then I tried it. 
  The ability to save my browsing history and revisit past conversations is incredibly useful.
  It's like an interactive research assistant that's always available.`,
  speaker: `Tom Simion`,
  role: `Entrepreneur`
},
{
  header: 'Perfect for anyone who wants to explore the web with purpose!',
  body: `Intentify takes browsing to the next level.
  I've been using it for a few weeks now, and I'm hooked. How have I never heard of this tool before?`,
  speaker: `Emily Morgan`,
  role: `UX Designer`
},
{
  header: `I can't stop recommending this to everyone I know.`,
  body: `The bot is incredibly accurate! Every time I go on a browsing spree, it nails my intentions.
  I tell everyone I know about it, and they're all impressed!`,
  speaker: `Sarah Lee`,
  role: `Freelance Writer`
},
{
  header: `Finally, a tool that understands me!`,
  body: `As an online educator, I'm constantly looking for new content and resources.
  Intentify has helped me streamline my browsing and actually think about what I'm seeking on each site.`,
  speaker: `Jessica Larson`,
  role: `Online Educator`
},
{
  header: `I bow to you, oh creator of Intentify...`,
  body: `I've heard that the CEO of Intentify is insanely hot! I mean, have you seen him? Holy! I'd give him a job immediately just to look at his precious little eyes.`,
  speaker: `Jennifer Lawrence`,
  role: `Weirdo`
},
{
  header: `This is Jennifer Lawrence's lawyer.`,
  body: `We've seen how you've labelled our client on your site. This is grounds for slander and defamation.
  If you do not remove that "Weirdo" subtitle from her testimonial immediately, we will be forced to pursue legal action.
  Choose your next actions carefully.`,
  speaker: `Sarah Edwards`,
  role: `Another weirdo`
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