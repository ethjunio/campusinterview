import React, { FC } from 'react';

export const Footer: FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="flex flex-shrink px-8 border-t border-light-soft py-6 justify-between items-center">
      <span className="h4">{title}</span>
      {children}
    </div>
  );
};
