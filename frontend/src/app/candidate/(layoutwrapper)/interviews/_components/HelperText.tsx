import { ReactElement, ReactNode } from 'react';

export interface HelperTextProps {
  icon: ReactElement;
  title: string;
  description: string | ReactNode;
}

const HelperText: React.FC<HelperTextProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white w-full lg:w-1/3 p-16 h-wull mt-1">
      <div className="flex pb-8 items-center">
        <div className="pr-3">{icon}</div>
        <h1>{title}</h1>
      </div>
      <div className="text-xl">{description}</div>
    </div>
  );
};

export default HelperText;
