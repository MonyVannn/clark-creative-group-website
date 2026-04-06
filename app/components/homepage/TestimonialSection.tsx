"use client";

import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import {
  StaggerTestimonials,
  StaggerTestimonialItem,
} from "./StaggerTestimonials";

// Note: The item at the end of the array will be the initially centered/active card
const testimonialsData = [
  {
    quote: `Efficiency is the name of the game with CCG!
    
    They have taken a deep dive into our systems and processes, automated and streamlined all of the things in our business while still keeping the balance of "human touch" while removing human error potential.

We are so grateful they took the time to actually understand the inner workings of our business model and gave us so much time back to do the parts of the business we really love and that we are great at.`,
    name: "Divinity Group Financial",
    title: "Kelly Devine",
    avatar: "/dg.png",
  },
  {
    quote: `When CCG made my website, I was BLOWN AWAY!
    
    I am technology illiterate, and needed as much help as possible, they took the ideas I had and added some of their own and the results were amazing! There was not a detail missed; they worked well with me on any changes I may have wanted (there were very few changes at all).

The way they took my existing themes and used custom-made images to enhance the viewer's experience was beyond any reasonable expectation I could have had.

I would recommend any business owner that is strapped for time, or wanting a bad*ss design to check CCG out!`,
    name: "Rise Financial",
    title: "Daven Beck",
    avatar: "/rise.png",
  },
  {
    quote: `Working with CCG has been an exceptional experience. They took the time to truly understand who we are as a company and what we stand for. From the initial consultation, it was clear that they were committed to capturing the exact statement we wanted to make online.

Their team's dedication to ensuring that our vision was fully realized in the website design was outstanding. They listened to our ideas, offered insightful suggestions, and went above and beyond to customize our site in a way that perfectly represents our brand.

We are incredibly proud of the final product, as it genuinely captures the essence of who we are. The website not only looks great but also resonates with our core values and mission. We highly recommend CCG to anyone looking to create a website that truly reflects their brand.`,
    name: "Executive Financial Partners",
    title: "Haley Bowlin",
    avatar: "/executive.png",
  },
  {
    quote: `I've been working with Hattie and Roger over the last several months to help optimize and expedite many of the mundane tasks that go along with running my own private practice in the world of therapy. They actively listened to my needs & customized a bot specifically for my practice.

This has cut more than half of my time engaging in paperwork outside of my sessions, giving me much needed free time between clients. This has lessened my overall stress and frustrations with having to do things the "old fashioned way".

I can safely say that this time saved is projected to save me more than 20K in time spent working and I couldn't be more pleased with them. They are attentive, caring, exceptionally competent and have been there every single step of the way to continue to personalize and optimize my bot; ensuring it's perfectly suited to my needs.

I would 100% recommend them to anyone looking to streamline and optimize their small business needs.`,
    name: "Warrior's Mindset",
    title: "Brandon Spengler, LCSW, MSW, MFT",
    avatar: "/mindset.png",
  },
];

const staggerItems: StaggerTestimonialItem[] = testimonialsData.map((t) => ({
  testimonial: t.quote,
  name: t.name,
  title: t.title,
  by: t.title,
  imgSrc: t.avatar,
}));

export default function TestimonialSection() {
  return (
    <section
      data-color="#f2f2f2"
      className="w-full h-full py-12 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <div className="w-full px-6 lg:px-24 mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <SplitText
            text="Case Studies"
            tag="h2"
            splitType="words, chars"
            className="font-clash-display font-semibold text-5xl lg:text-6xl leading-tight transition-colors duration-1000 text-white"
            textAlign="center"
            delay={20}
          />
          <br />
          <div>
            <SplitText
              text="Here's what other subscribers had to say about Clark Creative Group."
              tag="p"
              splitType="words"
              className="font-satoshi max-w-2xl text-base font-medium md:text-lg text-gray-400"
              textAlign="center"
              delay={40}
            />
          </div>
        </div>
      </div>

      {/* Full-bleed carousel block */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <StaggerTestimonials items={staggerItems} />
      </motion.div>
    </section>
  );
}
