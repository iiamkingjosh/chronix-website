import About from "@/components/page_components/home_page/About";
import Advantages from "@/components/page_components/home_page/Advantages";
import CompanyLogos from "@/components/page_components/home_page/CompanyLogos";
import FAQ from "@/components/page_components/home_page/FAQ";
import Hero from "@/components/page_components/home_page/Hero";
import Services from "@/components/page_components/home_page/Services";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <CompanyLogos />
      <Services />
      <About />
      <Advantages />
      <FAQ />
    </div>
  );
};

export default page;
