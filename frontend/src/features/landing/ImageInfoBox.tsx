import React, { FC, ReactNode } from "react";
import c from "classnames";

// Adjust the Image prop type to accept SVGProps along with className, but ensure className is always a string
interface ImageInfoBoxProps {
  Image: FC<React.SVGProps<SVGElement> & { className: string }>; // No need for 'string | null | undefined'
  imageSize?: "small" | "normal";
  title: string;
  message: string;
  children?: ReactNode;
}

export const ImageInfoBox: FC<ImageInfoBoxProps> = ({
  Image,
  title,
  message,
  imageSize = "normal",
  children,
}) => {
  const imgCn = {
    small: "w-44 h-44 xl:h-36 xl:w-36",
    normal: "w-56 h-56 xl:h-64 xl:w-64",
  }[imageSize];

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="flex justify-center flex-col lg:flex-row lg:space-y-0 lg:space-x-6 items-center">
        <Image className={c("flex-shrink-0", imgCn)} />
        <div className="flex flex-col items-center lg:items-start justify-between mt-4">
          <h1 className="text-3xl leading-loose text-primary-light mb-2">
            {title}
          </h1>
          <p
            className={c(
              "text-center lg:text-left text-primary-dark max-w-2xs text-base leading-tight lg:text-xl lg:leading-relaxed-2",
              {
                "mb-0": !children,
                "mb-8": !!children,
              }
            )}
          >
            {message}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};
