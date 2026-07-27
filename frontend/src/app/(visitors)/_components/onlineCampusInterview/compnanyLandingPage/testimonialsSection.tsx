"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";



const TestimonialsSection = () => {
  const t = useTranslations();

  const testimonials = [
    {
      company: t("looking-for-talent.testimonies.company-1"),
      rating: 4.5,
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/03.png",
  
      text: t("looking-for-talent.testimonies.message-1"),
    },
    {
      company: t("looking-for-talent.testimonies.company-2"),
      rating: 4.8,
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/01.jpg",
  
      text: t("looking-for-talent.testimonies.message-2"),
    },
    {
      company: t("looking-for-talent.testimonies.company-3"),
      rating: 4.2,
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/02.png",
  
      text: t("looking-for-talent.testimonies.message-3"),
    },
    {
      company: t("looking-for-talent.testimonies.company-4"),
      rating: 4.6,
      imageUrl: "https://cdn.campusinterview.ch/testimonies/companies/04.png",
  
      text: t("looking-for-talent.testimonies.message-4"),
    },
  ];
  return (
    <div
      className="
      relative 
      bg-cover bg-center bg-no-repeat
      flex flex-col items-center
      gap-[100px]
      py-[60px]
      px-4 sm:px-8 lg:px-0
      z-[5]
      max-w-8xl mx-auto px-[10px]
    md:px-[20px]
    lg:px-[30px]
    "
    >
      {/* Heading */}
      <div className="flex flex-col gap-4 text-center">
        <h2 className="font-bold text-gray-900 text-[#020418] !text-[36px] leading-[36px] font-bold">
          Impressions of past
        </h2>
        <h2 className="font-bold text-gray-900 text-[#020418] !text-[36px] leading-[38px] font-bold">
          events from Companies
        </h2>
      </div>

      {/* Slider Wrapper */}
      <div className="relative top-[-40px] w-full max-w-6xl overflow-hidden">
        {/* LEFT BUTTON */}
        <button className="testimonial-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 sm:p-2 rounded-full">
          <ArrowLeft size={18} />
        </button>

        {/* RIGHT BUTTON */}
        <button className="testimonial-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 sm:p-2 rounded-full">
          <ArrowRight size={18} />
        </button>

        {/* Slider Track */}

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 2.5,
            },
          }}
          loop
          className="px-6 !py-6 !md:px-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={item.company}
              className="w-full
            sm:w-[429px]
            min-h-[340px]
            flex flex-col items-start
            p-6 gap-2
            bg-[#fff]
            shadow-md
            rounded-[10px]
            flex-shrink-0
          "
            >
              <div className="flex flex-col items-start gap-3">
                <div className=" flex items-center justify-center">
                  <img
                    src={item?.imageUrl}
                    alt={item.company}
                    className="h-14 bg-no-repeat bg-center w-full bg-contain mb-4"
                  />
                </div>

                <p className="text-xl mb-3 font-semibold !text-[#8072FF] font-thin text-[#8072FF] !text-[22px] leading-[26px] mb-2">
                  {item.company}
                </p>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed text-[#020418] !text-[16px] leading-[22px] font-[400]">
                {item.text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;
