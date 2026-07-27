import React, { FC } from "react";
import c from "classnames";

const Info: FC<{
  step: number;
  title: string;
  date?: string;
  message: string;
}> = ({ step, title, date, message }) => (
  <div className="flex w-full xl:w-1/2 flex-col ">
    <div className="flex space-x-4">
      <div className="text-3xl flex flex-shrink-0 items-center justify-center rounded-full w-12 h-12 p-1 text-white font-extrabold bg-gradient-135-primary-light">
        {step}
      </div>
      <div className="space-y-1 flex flex-col justify-center xl:h-auto">
        <h2 className="text-primary-dark text-xl xl:text-xl font-bold leading-normal">
          {title}
        </h2>
        <div className="block xl:hidden  xl:block self-start px-2 font-extrabold text-sm mt-6 py-1a rounded bg-primary-dark text-white">
          {date}
        </div>
      </div>
    </div>
    <div
      className={c(
        "hidden xl:block xl:hidden self-start px-2 font-extrabold text-sm mt-6 rounded bg-primary-dark text-white",
        !date ? "invisible" : null
      )}
    >
      {date ? date : <div>no date</div>}
    </div>

    <div className="text-primary-light font-semibold text-md text-xl text-left leading-normal mt-6 xl:mt-3 xl:mt-6">
      {message}
    </div>
  </div>
);

export const HowDoesCampusWork: FC<{
  containerStyle?: any;
  steps: { step: number; title: string; date?: string; message: string }[];
}> = ({ containerStyle, steps }) => {
  const first2 = steps.filter((v, i) => i < 2);
  const last2 = steps.filter((v, i) => i >= 2);
  return (
    <div
      style={containerStyle}
      className="flex flex-col space-y-16 xl:space-y-0 xl:flex-row xl:space-x-8 "
    >
      <div className="xl:w-2/3 flex flex-col space-y-16 xl:flex-row xl:space-y-0 xl:space-x-8">
        {first2.map((info) => (
          <Info key={info.step} {...info} />
        ))}
      </div>

      <div className="xl:w-2/3 flex flex-col space-y-16 xl:flex-row xl:space-y-0 xl:space-x-8 ">
        {last2.map((info) => (
          <Info key={info.step} {...info} />
        ))}
      </div>
    </div>
  );
};
