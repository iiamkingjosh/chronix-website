import AboutUs from '@/components/page_components/about_us_page/AboutUs'
import AboutUsHero from '@/components/page_components/about_us_page/AboutUsHero'
import CoreValues from '@/components/page_components/about_us_page/CoreValues'
import OurStory from '@/components/page_components/about_us_page/OurStory'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-hidden'>
      <AboutUsHero/>
      <OurStory/>
      <CoreValues/>
      <AboutUs/>
    </div>
  )
}

export default page