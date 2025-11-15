"use client"

import CTA from '@/components/CallToAction/Cta'
import Features from '@/components/Feature/Feature'
import HowItWorks from '@/components/Feature/HowItWorks'
import Security from '@/components/Feature/Security'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import Navigation from '@/components/Navbar/Navbar'
import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image'
import Countdown from 'react-countdown'


import { VotingContext } from '@/context/Voter'
import Card from '@/components/Card/Card'
import image from "@/assets/user1.jpg"


const HOME = () => {
  const { VotingTitle } = useContext(VotingContext);
  return (
    <>
    {/* <Navigation /> */}
    <Hero />
    {/* <h1>{VotingTitle}</h1>  */}
    <Features />
    <HowItWorks />
    <Security />
    <CTA />
    <Footer />
    </>
  )
}

export default HOME