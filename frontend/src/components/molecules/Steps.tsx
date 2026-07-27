import React, { FC, useCallback, useState, Children } from 'react';
import c from 'classnames';
import { Tooltip } from '@/components/atoms/Tooltip';
import Link from 'next/link';

export const candidateOnboardingSteps = [
  'personal',
  'education',
  'experiences',
  'extracurriculars',
  'technical-skills',

  'languages',
  'lookingfor',

];

export const companyOnboardingSteps = [
  'general',
  'contact',
  'facts',
  'joinus',
  'participants',
];

export type StepsProps = {
  steps: string[];
  selected?: number;
  type: string;
  children?: React.ReactNode;
};

const stepBase = 'flex justify-center items-center border border-primary-dark border-solid rounded-full w-7 h-7 text-sm';

const defaultStep = c(stepBase, 'bg-white text-primary-dark');
const selectedStep = c(stepBase, 'bg-primary-dark text-white');
const hoverableStep = 'hover:bg-primary-softer hover:text-primary-dark cursor-pointer';
const disabledStep = 'opacity-50 cursor-default';

export const useSteps = (
  initialStep: number,
  count: number,
): [number, () => void] => {
  const [step, setStep] = useState(initialStep);

  const nextStep = useCallback(() => {
    if (step < count - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  }, [step, count, setStep]);

  return [step, nextStep];
};

export const Steps: FC<StepsProps> = ({
  children,
  steps,
  selected = 0,
  type,
}) => {
  const ActiveStep = Children.toArray(children).filter(
    (_, i) => i === selected,
  );

  const routeSteps = type === 'candidate'
    ? candidateOnboardingSteps
    : companyOnboardingSteps;

  return (
    <>
      <div className="mt-14 mb-8 hstack hstack-2">
        {steps.map((tooltip, index) => {
          const isCompletedOrActive = index <= selected;
          const isClickable = index < selected;

          const stepClasses = c(
            isCompletedOrActive ? selectedStep : defaultStep,
            isClickable ? hoverableStep : disabledStep
          );

          const stepCircle = (
            <Tooltip label={tooltip}>
              <div className={stepClasses}>{index + 1}</div>
            </Tooltip>
          );

          return (
            <div key={index} className="flex items-center">
              {isClickable ? (
                <Link
                  href={`/${type}/onboarding/${routeSteps[index]}`}
                  className="pointer"
                >
                  {stepCircle}
                </Link>
              ) : (
                stepCircle
              )}

              {index < steps.length - 1 && (
                <div className="w-16 md:w-20 lg:w-24 border-t h-0 border-primary-dark ml-2"></div>
              )}
            </div>
          );
        })}
      </div>
      {ActiveStep}
    </>
  );
};
