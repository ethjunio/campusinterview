import React, { FC, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import CloseIcon from '@/icons/ic-close.svg';

export interface NotificationHeaderProps {
  Icon?: FC<{ className: string }>;
  title?: string;
  description?: string;
  onBtnClick?: Function;
  btnText?: string;
  onClose?: Function;
  close?: boolean;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  Icon,
  title,
  description,
  onBtnClick,
  btnText,
  onClose,
  close,
}) => {
  const [open, setOpen] = useState(true);
  function handleClose() {
    setOpen(false);
    onClose && onClose();
  }

  if (!open) return null;

  return (
    <div className="flex bg-gradient-0-reverse-45-cta items-center justify-between">
      <div className="flex flex-1 justify-between py-6 pl-6 pr-12 flex-col lg:flex-row">
        <div className="flex">
          {Icon ? (
            <div className="bg-white rounded-full w-12 h-12 flex items-end mr-4 lg:mr-10">
              <Icon className="flex-shrink-0 -mt-2 text-primary-light fill-current w-12 h-12  p-2" />
            </div>
          ) : null}
          <div className="flex flex-col">
            {title ? (
              <h2 className="mb-1 font-extrabold text-white leading-7">
                {title}
              </h2>
            ) : null}
            {description ? (
              <div className="text-white hidden lg:block">{description}</div>
            ) : null}
          </div>
        </div>
        {description ? (
          <div className="text-white mt-4 mb-2 lg:hidden">{description}</div>
        ) : null}
        {btnText ? (
          <Button variant="outline" onClick={() => onBtnClick && onBtnClick()}>
            {btnText}
          </Button>
        ) : null}
      </div>
      {close ? (
        <CloseIcon
          className="w-4 h-4 text-white fill-current cursor-pointer self-start mt-2 mr-2"
          onClick={() => handleClose()}
        />
      ) : null}
    </div>
  );
};

export default NotificationHeader;
