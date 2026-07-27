import React, {
    FC,
    cloneElement,
    Children,
    ReactElement,
    ReactNode,
    isValidElement,
  } from 'react';
  
  // Title Component
  export const Title: FC<{ as?: 'h1' | 'h3'; className?: string }> = ({
    as: Component = 'h3',
    children,
    ...props
  }) => <Component {...props}>{children}</Component>;
  
  // Submit Component
  export const Submit: FC<{ isSubmitting?: boolean }> = ({
    children,
    isSubmitting = false,
  }) => (
    <>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              type: 'submit',
              tw: '',
              disabled: isSubmitting,
            })
          : child,
      )}
    </>
  );
  
  // Skip Component
  export const Skip: FC = ({ children }) => (
    <>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              type: 'button',
              tw: 'mt-12 max-w-xs',
            })
          : child,
      )}
    </>
  );
  
  // Compound Component Types
  export type CFC<T> = FC<T> & {
    Title: typeof Title;
    Submit: typeof Submit;
  };
  
  export type CSFC<T> = CFC<T> & {
    Skip?: typeof Skip;
  };
  
  // useCompounds Hook
  export function useCompounds(
    children: ReactNode,
  ): [ReactElement | null, ReactElement | null, ReactElement | null] {
    let title: ReactElement | null = null;
    let submit: ReactElement | null = null;
    let skip: ReactElement | null = null;
  
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
  
      if (child.type === Title) {
        title = child;
      } else if (child.type === Submit) {
        submit = child;
      } else if (child.type === Skip) {
        skip = child;
      }
    });
  
    return [title, submit, skip];
  }
  