"use client"
import React, { FC } from 'react';
import chunk from 'lodash/chunk';

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import SlideRight from '@/icons/ic-slider_1.svg';
import SlideLeft from '@/icons/ic-slider_2.svg';
import useMatcher from './responsiveQueries';

export const CompanySlider: FC<{ companyLogos: { imageUrl: string }[] }> = ({
  companyLogos,
}) => {
  const { matcher } = useMatcher();
  const chunks = chunk(companyLogos, 2);
  return (
    <CarouselProvider
      className="flex justify-between items-center"
      isIntrinsicHeight
      infinite
      naturalSlideWidth={80}
      naturalSlideHeight={128}
      visibleSlides={matcher([2, 4, 5], false)}
      totalSlides={chunks.length}>
      <ButtonBack>
        <SlideLeft className="h-8 w-8  lg:h-10 lg:w-10 fill-current text-primary-dark" />
      </ButtonBack>
      <Slider className="flex-grow h-full">
        {chunks.map(([first, second], index) => (
          <Slide key={index} index={index}>
            <div className="flex flex-col h-full space-y-6 items-center">
              <img
                className="w-20 h-auto lg:w-40 lg:h-auto"
                src={first.imageUrl}
              />
              {second && (
                <img
                  className="w-20 h-auto lg:w-40 lg:h-auto"
                  src={second.imageUrl}
                />
              )}
            </div>
          </Slide>
        ))}
      </Slider>
      <ButtonNext className="flex-shrink">
        <SlideRight className="h-8 w-8  lg:h-10 lg:w-10 fill-current text-primary-dark" />
      </ButtonNext>
    </CarouselProvider>
  );
};
