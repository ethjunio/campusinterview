import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import CloseIcon from "@/icons/ic-close.svg";
import c from "classnames";

export interface ModalBasicProps {
  modalStatus: boolean;
  toggleModal?: Function;
  children?: any;
  backgroundColor?: string;
  closeIconColor?: string;
  close?: boolean;
  disableOverflow?: boolean;
}

export const ModalBasic: React.FC<ModalBasicProps> = (props) => {
  const {
    modalStatus,
    toggleModal,
    children,
    backgroundColor,
    closeIconColor,
    close = true,
    disableOverflow,
  } = props;

  return (
    <Transition show={modalStatus} as={Fragment}>
      <Dialog
        onClose={() => toggleModal && toggleModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center px-4">
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
            />
          </TransitionChild>

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
                backgroundColor || "bg-white",
                !disableOverflow && "max-h-screen overflow-y-auto",
              )}
            >
              {close && (
                <div
                  className="flex justify-end mb-2"
                  onClick={() => toggleModal && toggleModal()}
                >
                  <CloseIcon
                    className={c(
                      "w-5 h-5 fill-current cursor-pointer",
                      closeIconColor,
                    )}
                  />
                </div>
              )}
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

ModalBasic.defaultProps = {
  backgroundColor: "transparent",
  closeIconColor: "text-primary-light",
};
