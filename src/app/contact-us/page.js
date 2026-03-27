import FAQForm from "../../components/page_components/faq/FAQForm";
import FAQs from "../../components/page_components/faq/FAQs";
import Features from "../../components/page_components/faq/Features";
import React from "react";

export const metadata = {
  title: 'Contact Us | Chronix Technology',
  description:
    'Get in touch with Chronix Technology Limited. Reach our team in Lagos, Nigeria for IT support, managed services, cybersecurity, cloud, and network infrastructure enquiries.',
  openGraph: {
    title: 'Contact Us | Chronix Technology',
    description:
      'Reach the Chronix Technology team for IT support and managed services enquiries in Lagos, Nigeria.',
    url: 'https://chronixtechnology.com/contact-us',
    siteName: 'Chronix Technology',
    images: [
      {
        url: '/images/home_page/chronix-logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact Chronix Technology',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Chronix Technology',
    description:
      'Reach the Chronix Technology team for IT support and managed services enquiries in Lagos, Nigeria.',
    images: ['/images/home_page/chronix-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <>
      <FAQForm />
      <FAQs />
      <Features />
    </>
  );
};

export default page;