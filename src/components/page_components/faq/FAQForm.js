import { faqPageText } from "@/app/index/text_contents";
import Image from "next/image";
import React from "react";

const FAQForm = () => {
  return (
    <div className="min-h-screen flex items-start justify-center md:justify-between pt-8 md:pt-[20vh]">
      {/* Image Panel */}
      <div className="hidden md:flex md:w-1/2 rounded-r-4xl overflow-hidden md:min-h-screen self-start mt-0 relative">
        <Image
          src={faqPageText.image}
          fill
          alt="FAQ Images"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Form Panel */}
      <div className="h-auto w-full md:w-1/2 flex flex-col items-center px-4 md:px-8 self-start md:mt-0">
        <h1 className="text-4xl font-orbitron font-bold text-center w-full">
          {faqPageText.heading}
        </h1>
        <p className="max-w-sm text-center mt-2 mb-6">
          {faqPageText.subHeading}
        </p>

        <form className="w-full max-w-md flex flex-col gap-4">
          {/* First Name & Last Name Row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium text-gray-700 pl-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium text-gray-700 pl-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="e.g. Smith"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 pl-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. jane.smith@email.com"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 pl-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. +1 (555) 000-1234"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-sm"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 pl-1">
              Your Message
            </label>
            <textarea
              placeholder="e.g. I'd like to know more about your pricing plans and how I can get started..."
              rows={5}
              className="w-full px-5 py-3 rounded-[2rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full btn btn-lg btn-secondary btn-pill text-center flex items-center justify-center"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQForm;
