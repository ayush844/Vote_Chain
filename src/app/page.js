import CTA from '@/components/CallToAction/Cta'
import Features from '@/components/Feature/Feature'
import HowItWorks from '@/components/Feature/HowItWorks'
import Security from '@/components/Feature/Security'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import Navigation from '@/components/Navbar/Navbar'
import React from 'react'

const HOME = () => {
  return (
    <>
    <Navigation />
    <Hero />
    <Features />
    <HowItWorks />
    <Security />
    <CTA />
    <Footer />
    </>
  )
}

export default HOME