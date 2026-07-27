"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface LogoCarouselProps {
  logos: { imageUrl: string }[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  if (!logos.length) return null;

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        loop={logos.length > 1}
        className="px-12"
      >
        {logos.map(({ imageUrl }) => (
          <SwiperSlide key={imageUrl}>
            <div className="h-20 flex items-center justify-center p-4">
              <img
                src={imageUrl}
                alt="Company logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
