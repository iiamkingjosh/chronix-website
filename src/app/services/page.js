import AboutHero from "@/components/page_components/services_page/ServicesHero";
import Offers from "@/components/page_components/services_page/Offers";
import Services from "@/components/page_components/services_page/Services";
import React from "react";

export const metadata = {
  title: 'IT Services | Chronix Technology',
  description:
    'Explore Chronix Technology\'s IT services: managed IT, network infrastructure, cybersecurity, cloud solutions, CCTV surveillance, and more for businesses in Lagos, Nigeria.',
  openGraph: {
    title: 'IT Services | Chronix Technology',
    description:
      'Managed IT, cybersecurity, cloud, network infrastructure, and surveillance solutions for businesses in Lagos and across Nigeria.',
    url: 'https://chronixtechnology.com/services',
    siteName: 'Chronix Technology',
    images: [
      {
        url: '/images/home_page/chronix-logo.png',
        width: 1200,
        height: 630,
        alt: 'Chronix Technology IT Services',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services | Chronix Technology',
    description:
      'Managed IT, cybersecurity, cloud, and network infrastructure services for businesses in Nigeria.',
    images: ['/images/home_page/chronix-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <AboutHero />
      <Offers />
      <Services/>
    </div>
  );
};

export default page;
