import React, { FC } from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const ProfileForm: FC<Props> = ({ title, children }) => {
  return (
    <section className="lg:max-w-screen-md">
      <h1>{title}</h1>
      {/* <div className="mb-10 danger-text"></div> */}
      {/* <div className="mb-10 danger-text">{error}</div> */}
      {children}
    </section>
  );
};
