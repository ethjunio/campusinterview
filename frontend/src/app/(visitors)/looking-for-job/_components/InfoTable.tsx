'use client';
import React, { FC } from 'react';

export const InfoTable: FC<{
  rows: { title: string; value: string }[];
}> = ({ rows }) => {
  return (
    <div className="xl:max-w-lg">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="flex flex-col">
            {rows.map(({ title, value }) => (
              <div
                className="flex justify-between items-center"
                key={`agenda-${title}`}
              >
                <div className="pt-3 text-primary-dark text-sm max-w-1/2 font-semibold lg:text-xl">
                  {title}
                </div>
                <div className="pt-3 lg:pl-12 flex-grow-0 text-center md:w-52">
                  <div className="rounded-md bg-light text-base text-primary-light font-bold py-1 px-3 lg:px-3 lg:py-1 text-center sm:w-[11rem]">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
