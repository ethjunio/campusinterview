"use client";

import React, {
  FC,
  ReactElement,
  forwardRef,
  ReactNode,
  useState,
  useCallback,
} from "react";

import c from "classnames";
import ArrowRight from "@/icons/ic-arrow-right.svg";
import Close from "@/icons/ic-close.svg";
import CheckIcon from "@/icons/ic-check.svg";
import HelpIcon from "@/icons/ic-help.svg";
import WithdrawIcon from "@/icons/ic-withdraw.svg";
import Delete from "@/icons/ic-delete.svg";
import Plus from "@/icons/ic-plus.svg";

type Props = {
  children?: ReactNode;
  variant?:
    | "primary-light"
    | "primary-dark"
    | "link"
    | "outline"
    | "accent"
    | "small-green"
    | "small-red"
    | "small-yellow"
    | "small-blue"
    | "transparent";
  disabled?: boolean;
  tw?: string;
  onClick?: (evt?: any) => void;
  type?: "button" | "reset" | "submit";
  style?: any;
};

function getVariant(variant: string) {
  return c("btn", {
    "btn-primary-light": variant === "primary-light",
    "btn-primary-dark": variant === "primary-dark",
    "btn-accent": variant === "accent",
    "btn-link": variant === "link",
    "btn-outline": variant === "outline",
    "btn-small-green": variant === "small-green",
    "btn-small-red": variant === "small-red",
    "btn-small-yellow": variant === "small-yellow",
    "btn-small-blue": variant === "small-blue",
    "btn-transparent": variant === "transparent",
  });
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      tw,
      children,
      variant = "primary-light",
      disabled = false,
      type = "button",
      onClick = () => null,
      style,
    },
    ref,
  ) => {
    const cn = c(getVariant(variant), tw);

    return (
      <button
        ref={ref}
        style={style}
        disabled={disabled}
        className={cn}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

type IconButtonProps = Props & {
  icon: ReactElement;
  position?: "before" | "after";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, icon, position = "after", tw, ...props }, ref) => {
    return (
      <Button ref={ref} tw={c("btn-icon min-h-0 px-4", tw)} {...props}>
        <div className="flex items-center">
          {position === "before" && icon}
          {children ? (
            <div className={c(position === "before" ? "ml-2" : "mr-2")}>
              {children}
            </div>
          ) : null}
          {position === "after" && icon}
        </div>
      </Button>
    );
  },
);
IconButton.displayName = "displayName";

export const ArrowButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => (
    <IconButton
      ref={ref}
      {...props}
      icon={
        <ArrowRight
          className={c(
            "w-4 h-4 fill-current  stroke-current stroke-3",
            props?.children && props?.children?.toString().length > 0
              ? "ml-4"
              : "",
          )}
        />
      }
    />
  ),
);
ArrowButton.displayName = "ArrowButton";

type ToggleProps = {
  toggled?: boolean;
  toggledLabel: string;
  label: string;
  onToggle: (toggled: boolean) => void;
  disabled?: boolean;
  tw?: string;
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ toggled = false, toggledLabel, label, onToggle, ...props }, ref) => {
    const [isToggled, setToggled] = useState(toggled);
    const handleClick = useCallback(() => {
      setToggled(!isToggled);
      onToggle(!isToggled);
    }, [isToggled, onToggle]);

    return (
      <Button
        {...props}
        ref={ref}
        variant={isToggled ? "primary-dark" : "primary-light"}
        onClick={handleClick}
      >
        {isToggled ? toggledLabel : label}
      </Button>
    );
  },
);
ToggleButton.displayName = "ToggleButton";

export const CloseButton: FC<{ onClose?: () => void }> = ({ onClose }) => (
  <IconButton
    onClick={onClose}
    variant="outline"
    tw="absolute p-0 right-0 top-0 mr-4 bg-transparent hover:bg-transparent hover:text-white text-white border-transparent mt-4 close-button"
    icon={<Close className="w-4 h-4 text-white fill-current" />}
  />
);

export const AcceptButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <IconButton
    onClick={onClick}
    position="before"
    variant="small-green"
    disabled={disabled}
    tw="justify-start interviewStatusButton w-full"
    icon={
      <CheckIcon className="w-4 h-4 mr-2 text-green-light fill-current stroke-current stroke-2" />
    }
  >
    {children}
  </IconButton>
);

export const DeclineButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <IconButton
    onClick={onClick}
    position="before"
    variant="small-red"
    tw="justify-start interviewStatusButton w-full"
    disabled={disabled}
    icon={
      <Close className="w-4 h-4 mr-2 text-red fill-current stroke-current stroke-2" />
    }
  >
    {children}
  </IconButton>
);

export const WaitingListButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <IconButton
    onClick={onClick}
    position="before"
    variant="small-yellow"
    tw="justify-start interviewStatusButton w-full"
    disabled={disabled}
    icon={
      <HelpIcon className="w-4 h-4 mr-2 text-yellow fill-current stroke-current stroke-2" />
    }
  >
    {children}
  </IconButton>
);

export const WithdrawButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <IconButton
    onClick={onClick}
    position="before"
    variant="small-blue"
    tw="justify-start interviewStatusButton w-fit"
    disabled={disabled}
    icon={
      <WithdrawIcon className="w-4 h-4 mr-2 text-primary-light fill-current stroke-current stroke-2" />
    }
  >
    {children}
  </IconButton>
);

export const RemoveButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  tw?: string;
}> = ({ onClick, children, disabled, tw }) => (
  <IconButton
    onClick={onClick}
    variant="outline"
    tw={c("rounded lg:self-start self-center justify-center", tw)}
    disabled={disabled}
    icon={<Delete className="lg:ml-4 h-4 w-4 fill-current" />}
  >
    {children}
  </IconButton>
);

export const AddButton: FC<{
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  tw?: string;
}> = ({ onClick, children, disabled, tw }) => (
  <IconButton
    onClick={onClick}
    variant="outline"
    tw={c("rounded", tw)}
    disabled={disabled}
    icon={<Plus className="lg:ml-4 h-4 w-4 fill-current" />}
  >
    {children}
  </IconButton>
);
