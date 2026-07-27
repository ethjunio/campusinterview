import React, { FC, ReactElement, useRef } from "react";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useTooltipTrigger } from "@react-aria/tooltip";
import { useTooltip } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTransition, animated } from "@react-spring/web";

interface TooltipProps {
  children: ReactElement;
  label: string;
  placement?: "top" | "bottom" | "left" | "right";
  [key: string]: any;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  label,
  placement = "top",
  ...rest
}) => {
  const state = useTooltipTriggerState({ delay: 400 });
  const ref = useRef<HTMLElement>(null);

  const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, ref);
  const { tooltipProps: ariaTooltipProps } = useTooltip(
    { ...tooltipProps, role: "tooltip" },
    state
  );

  const transitions = useTransition(state.isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 500, friction: 40 },
  });

  const getPositionStyle = (): React.CSSProperties => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return {};

    const tooltipWidth = 200;
    const tooltipHeight = 40;
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = rect.top - tooltipHeight - gap + window.scrollY;
        left = rect.left + rect.width / 2 - tooltipWidth / 2 + window.scrollX;
        break;
      case "bottom":
        top = rect.bottom + gap + window.scrollY;
        left = rect.left + rect.width / 2 - tooltipWidth / 2 + window.scrollX;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
        left = rect.left - tooltipWidth - gap + window.scrollX;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
        left = rect.right + gap + window.scrollX;
        break;
    }

    return { top, left };
  };

  return (
    <>
      {React.cloneElement(children, mergeProps(triggerProps, { ref }))}
      {transitions((styles, item) =>
        item ? (
          <animated.div
            {...ariaTooltipProps}
            {...rest}
            style={{
              ...styles,
              position: "fixed",
              zIndex: 100000,
              minWidth: 200,
              ...getPositionStyle(),
            }}
            className="tooltip bg-primary-light shadow-md border-0 rounded px-2 py-1 text-white general-text-sm text-center"
          >
            {label}
          </animated.div>
        ) : null
      )}
    </>
  );
};
