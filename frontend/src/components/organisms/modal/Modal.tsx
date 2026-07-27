import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "@/components/atoms/Button";
import CloseIcon from "@/icons/ic-close.svg";
import c from "classnames";
import { Fragment } from "react";

export interface ModalProps {
  modalStatus: boolean;
  title?: string;
  description?: string;
  onClickFirstBtn?: () => void;
  onClickSecondBtn?: () => void;
  textFirstBtn?: string;
  textSecondBtn?: string;
  toggleModal?: () => void;
  backgroundColor?: string;
  close?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  modalStatus,
  title,
  description,
  onClickFirstBtn,
  onClickSecondBtn,
  textFirstBtn,
  textSecondBtn,
  toggleModal,
  backgroundColor = "bg-gradient-0-135-modal",
  close = true,
}) => {
  return (
    <Transition show={modalStatus} as={Fragment}>
      <Dialog
        onClose={() => close && toggleModal?.()}
        className="relative z-50"
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={c(
                "flex flex-col pb-6 md:pb-12 px-6 md:px-12 text-white rounded-xl w-full max-w-screen-sm transform transition-all",
                close ? "pt-6" : "pt-12",
                backgroundColor,
                "max-h-screen overflow-y-auto",
              )}
            >
              {close && (
                <div className="flex justify-end mb-2" onClick={toggleModal}>
                  <CloseIcon className="w-5 h-5 fill-current text-white cursor-pointer" />
                </div>
              )}
              {title && (
                <h1 className="text-white mb-8 w-full sm:w-4/5">{title}</h1>
              )}
              {description && (
                <p className="text-white w-full sm:w-3/4 text-lg">
                  {description}
                </p>
              )}
              <div className="flex justify-end">
                {textSecondBtn && (
                  <Button
                    tw="self-end mt-10 text-white"
                    variant="transparent"
                    onClick={onClickSecondBtn}
                  >
                    {textSecondBtn}
                  </Button>
                )}
                {textFirstBtn && (
                  <Button
                    tw="self-end mt-5 md:mt-10 ml-5 md:ml-10"
                    variant="outline"
                    onClick={onClickFirstBtn}
                  >
                    {textFirstBtn}
                  </Button>
                )}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
