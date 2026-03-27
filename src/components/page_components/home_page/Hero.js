import { heroHeading, heroSubHeading } from "@/app/index/text_contents";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const splitHeading = heroHeading.split(" ").reduce((lines, word) => {
    if (word === "&" && lines.length > 0) {
      lines[lines.length - 1] = `${lines[lines.length - 1]} ${word}`;
    } else {
      lines.push(word);
    }

    return lines;
  }, []);

  return (
    <section className="relative h-screen flex items-center w-full overflow-hidden">
      {/* Background Image */}
      <Image
        width={1920}
        height={1080}
        src={"/images/home_page/hero-bg.png"}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        priority
        alt="IT infrastructure and cybersecurity solutions background in Lagos Nigeria"
      />

      {/* Hero Man Image */}
      <div
        className="hidden md:block absolute z-0 translate-x-28 translate-y-24 w-225 md:w-225 lg:w-225 xl:w-225 2xl:w-225"
        style={{ bottom: "0px", right: "-20px" }}
      >
        <Image
          width={800}
          height={1000}
          src={"/images/home_page/hero-man.png"}
          className="w-full h-auto object-contain object-bottom"
          alt="IT professional representing Chronix Technology cybersecurity and infrastructure services"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative h-[70%] w-full max-w-7xl mx-auto flex items-center z-10 px-4 md:px-8 lg:px-12">
        {/* Text Content */}
        <div className="flex flex-col items-start max-w-2xl">
          {/* ✅ MAIN SEO HEADING */}
<h1 className="text-[1.5rem] md:text-[3.5rem] font-bold text-white mb-4 leading-tight font-orbitron">            {splitHeading.map((word, index) => (
              <span
                key={index}
                className={`${
                  index === 0 && "text-vibrant_orange"
                } block tracking-wider`}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* ✅ SUPPORTING SEO TEXT */}
          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            {heroSubHeading}
          </p>

          {/* CTA */}
          <span className="w-full items-center justify-start mt-4 flex gap-x-4">
            <Link href="/about-us" className="btn btn-white btn-lg rounded-2xl">
              Explore Articles
            </Link>
            <Link
              href="#footer-subscribe"
              className="btn btn-white-outline btn-lg rounded-2xl"
            >
              Subscribe for Updates
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;