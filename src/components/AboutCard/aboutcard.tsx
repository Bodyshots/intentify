"use client";

import './aboutcard.css'
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export const AboutCard = () => {
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="about_container px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">About <b>Intentify</b></h1>
      <p className="py-2">Welcome to <b>Intentify</b>, a cutting-edge platform that brings a unique twist to understanding the true purpose behind your online interactions. At <b>Intentify</b>, we believe that every visit to a website tells a story, and our mission is to help you uncover the hidden intentions behind each click.</p>
      <h2 className="text-4xl py-4">What is <b>Intentify</b>?</h2>
      <p className="pb-2"><b>Intentify</b> service that gives you a collection of innovative AI-powered chatbots designed to engage with visitors in a dynamic, personalized way. By simply entering a URL, users can start an interactive experience where one of our intelligent bots asks a series of multiple-choice questions about their website's content. But, we don't just stop there. We want to understand why you're visiting that particular webpage, what your true intentions are, and even what your occupation might be. With each interaction, our bot learns more about your behavior, offering an insightful and engaging journey that goes beyond traditional web browsing.</p>
      <h2 className="text-4xl py-4">How does it work?</h2>
      <p className="pb-2">When you input a URL into <b>Intentify</b>, the chatbot scans the website's content, then begins asking multiple-choice questions. These questions are carefully designed to identify why you're visiting the page, whether it's to gather information, make a purchase, or explore a new topic. Additionally, the bot strives to gauge your occupation, allowing us to provide even more tailored questions and predictions. This process ensures a highly engaging, personalized conversation based on your browsing activity.</p>
      <br/>
      <p className="pb-2">But what if you're not done exploring? Don't worry, <b>Intentify</b>'s chatbot can help you continue your journey. If you'd like, you can ask the bot to find related pages to explore. Whether you're looking for similar articles, services, or products, the bot will assist in finding new links that fit your interests. After each exploration, the chatbot will repeat the process of analyzing your intentions and occupation, keeping the conversation fresh and relevant as your browsing session evolves.</p>
      <h2 className="text-4xl py-4">Your Personalized Conversation History</h2>
      <p className="pb-2">For users who sign up and register with <b>Intentify</b>, we offer an even deeper layer of customization and functionality. Once you've completed a conversation with our bot, you can choose to save it to your conversation list. This list acts as a personal record of all the links you've explored with the chatbot, along with the predicted intentions and occupations that were identified during your interactions. Whether you're revisiting a past exploration or simply want to keep track of your online journeys, this feature ensures that all your chatbot-driven conversations are readily accessible.</p>
      <br/>
      <p className="pb-2">Additionally, if you ever want to delete your past conversations, you can! We give you full control over your browsing history and personal data.</p>
      <h2 className="text-4xl py-4">Why Choose <b>Intentify</b>?</h2>
      <p className="pb-2">By leveraging the power of AI and machine learning, we provide users with a unique, fun, and insightful way to interact with the web. We're not just about tracking your clicks; we're here to explore your deeper motivations and professional interests. Whether you're a curious visitor or a professional looking for more tailored web interactions, <b>Intentify</b> is designed to help you understand the web in a whole new light.</p>
      <br/>
      <p className="pb-2">So, why settle for traditional web browsing when you can engage with your content, uncover your intentions, and enhance your online experience? Join the growing community of users who are using <b>Intentify</b> to discover more about the websites they visit and themselves.</p>
      <h2 className="text-4xl py-4">Join Us Today!</h2>
      <p className="pb-2">We're continually improving and evolving, with new features and insights being added to help you get even more out of your web experience. Register now, start exploring, and let <b>Intentify</b> help you uncover the true purpose behind your digital interactions. We're excited to have you as part of the <b>Intentify</b> journey!</p>
      <div className="text-center text-2xl p-10 w-9/12 m-auto">
      Welcome to <b>Intentify</b> - where every click brings you closer to understanding your intentions and identity.
      </div>
    </div>
  )
}