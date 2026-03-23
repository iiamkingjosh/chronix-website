import FAQForm from "@/components/page_components/faq/FAQForm";
import FAQs from "@/components/page_components/faq/FAQs";
import Features from "@/components/page_components/faq/Features";
import React from "react";

const page = () => {
  return (
    <div>
      <FAQForm />
      <Features />
      <FAQs />
    </div>
  );
};

export default page;
