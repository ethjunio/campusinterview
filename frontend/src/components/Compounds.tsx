import React, {
  FC,
  cloneElement,
  Children,
  ReactElement,
  ReactNode,
} from "react";

export const Title: FC<{
  as?: "h1" | "h3";
  className?: string;
  children?: ReactNode;
}> = ({ as: Comp = "h3", children, ...props }) => (
  <Comp {...props}>{children}</Comp>
);

export const Submit: FC<{ isSubmitting?: boolean; children?: ReactNode }> = ({
  children,
  isSubmitting = false,
}) => (
  <>
    {Children.map(children, (child) =>
      cloneElement(child as ReactElement, {
        type: "submit",
        tw: "",
        disabled: isSubmitting,
      })
    )}
  </>
);

export const Skip: FC<{ children?: ReactNode }> = ({ children }) => (
  <>
    {Children.map(children, (child) =>
      cloneElement(child as ReactElement, {
        type: "button",
        tw: "mt-12 max-w-xs",
      })
    )}
  </>
);

export type CFC<T> = FC<T> & {
  Title: typeof Title;
  Submit: typeof Submit;
};

export type CSFC<T> = CFC<T> & {
  Skip?: typeof Skip;
};

export function useCompounds(
  children: ReactNode
): [
  typeof Title | ReactElement | null,
  typeof Submit | ReactElement | null,
  typeof Skip | null | ReactElement
] {
  let title = null;
  let submit = null;
  let skip = null;
  Children.forEach(children, (node) => {
    const child = node as ReactElement;
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
