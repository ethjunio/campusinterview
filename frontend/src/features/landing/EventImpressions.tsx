import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Background from "@/icons/illustrations/illustration_background_impressions.svg";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";

const EventImpressions = ({
  impressions,
  fullPage,
  containerStyle,
}: {
  impressions: any[];
  fullPage?: boolean;
  containerStyle?: any;
}) => {
  const t = useTranslations();

  return (
    <section style={containerStyle} className="relative sm:py-40 px-8 xl:px-40">
      <Background
        style={{ height: 680 }}
        className="absolute top-0 right-0 left-0 w-screen bottom-0 text-light-softer fill-current -z-10"
      />
      <h1 className="text-primary-light  mb-8 sm:mb-16">
        {t("looking-for-talent.impressions.title")}
      </h1>
    <div className="relative past-events">
  {/* Custom Navigation Buttons */}
  <button className="swiper-button-prev-custom swiper-button-prev-custom-imp absolute left-[-21px] top-[28%] sm:top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full md:left-[-30px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
    >
      <path d="M20.817 29.104a1.275 1.275 0 001.784-.01 1.254 1.254 0 00-.001-1.768l-1.812-1.815h9.96a1.253 1.253 0 000-2.504h-9.96L22.6 21.19a1.255 1.255 0 00-.01-1.779 1.244 1.244 0 00-.887-.368c-.335 0-.65.131-.886.368l-3.948 3.955a1.252 1.252 0 00-.37.891c0 .336.131.653.368.89l3.95 3.956z"></path>
      <path d="M24.25 45.991c11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737zm0-40.294c10.232 0 18.556 8.325 18.556 18.557S34.482 42.81 24.25 42.81c-10.232 0-18.556-8.324-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557z"></path>
    </svg>
  </button>
  <button className="swiper-button-next-custom swiper-button-next-custom-imp absolute right-[-24px] top-[28%] sm:top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full md:right-[-30px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-8 w-8 lg:h-10 lg:w-10 fill-current text-primary-dark"
    >
      <path d="M27.683 19.403a1.275 1.275 0 00-1.784.01 1.254 1.254 0 00.001 1.769l1.812 1.815h-9.96a1.253 1.253 0 000 2.504h9.96L25.9 27.316a1.255 1.255 0 00.01 1.779c.237.237.552.368.887.368.334 0 .65-.13.886-.368l3.948-3.955c.238-.238.369-.554.369-.891 0-.336-.13-.652-.367-.89l-3.95-3.956z"></path>
      <path d="M24.25 2.516c-11.986 0-21.738 9.752-21.738 21.738 0 11.986 9.752 21.737 21.738 21.737 11.986 0 21.737-9.751 21.737-21.737 0-11.986-9.751-21.738-21.737-21.738zm0 40.294c-10.232 0-18.556-8.325-18.556-18.556 0-10.232 8.324-18.557 18.556-18.557 10.232 0 18.556 8.325 18.556 18.557 0 10.231-8.324 18.556-18.556 18.556z"></path>
    </svg>
  </button>

  <Swiper
    modules={[Navigation]}
    spaceBetween={5}
    slidesPerView={3}
    navigation={{
      prevEl: ".swiper-button-prev-custom-imp",
      nextEl: ".swiper-button-next-custom-imp",
    }}
    loop={impressions.length > 1}
    className="px-12"
    breakpoints={{
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }}
  >
    {impressions.map(({ small }, index) => (
      <SwiperSlide key={index}>
        <div className="flex flex-col items-center justify-center text-center h-full p-4">
          <img
            src={small}
            alt="testimony"
            className="object-cover w-full h-32 sm:h-72 rounded-lg"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </section>
  );
};

export default EventImpressions;
