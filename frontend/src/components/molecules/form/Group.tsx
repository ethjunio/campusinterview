import React, { FC, useState } from "react";
import c from "classnames";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import PlusIcon from "@/icons/ic-plus.svg";
import MinusIcon from "@/icons/ic-minus.svg";

// export const Group: FC<{
//   disabled?: boolean;
//   title: string;
//   count: number;
//   initialOpen?: boolean;
//   children?: React.ReactNode;
// }> = ({ disabled = false, title, children, count, initialOpen }) => {
//   const [isOpen, setIsOpen] = useState(initialOpen ? initialOpen : false);

//   return (
//     <li className="border-b border-light-soft pb-4">
//       <Disclosure
//         defaultOpen={isOpen}
//         // onChange={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <DisclosureButton
//           className={c("flex items-center justify-between w-full", {
//             "cursor-not-allowed": disabled,
//             "cursor-pointer": !disabled,
//           })}
//         >
//           <h4
//             className={c("text-left", {
//               "text-dark-softer": disabled,
//               "text-dark": !disabled,
//             })}
//           >
//             {title}
//           </h4>
//           <div className="w-8"></div>
//           <div className="flex items-center">
//             {count > 0 && (
//               <div className="flex items-center justify-center general-text-sm px-1  bg-primary-light text-white rounded-full w-5 h-5">
//                 {count}
//               </div>
//             )}
//             {isOpen ? (
//               <MinusIcon
//                 className={c("ml-4 w-4 h-4 fill-current", {
//                   "cursor-not-allowed text-primary-soft": disabled,
//                   "cursor-default text-primary-light": !disabled,
//                 })}
//               />
//             ) : (
//               <PlusIcon
//                 className={c("ml-4 w-4 h-4 fill-current", {
//                   "cursor-not-allowed text-primary-soft": disabled,
//                   "cursor-default text-primary-light": !disabled,
//                 })}
//               />
//             )}
//           </div>
//         </DisclosureButton>
//         <DisclosurePanel className="mt-8">
//           <div className="space-y-2">{children}</div>
//         </DisclosurePanel>
//       </Disclosure>
//     </li>
//   );
// };


export const Group: FC<{
  disabled?: boolean;
  title: string;
  count: number;
  initialOpen?: boolean;
  children?: React.ReactNode;
}> = ({ disabled = false, title, children, count, initialOpen = false }) => {
  return (
    <li className="border-b border-light-soft pb-4 filter-group">
      <Disclosure
        as="div"
        defaultOpen={initialOpen}
      >
        {({ open }) => (
          <>
            <DisclosureButton
              className={c("flex items-center justify-between w-full", {
                "cursor-not-allowed": disabled,
                "cursor-pointer": !disabled,
              })}
              disabled={disabled}
            >
              <h4
                className={c("text-left", {
                  "text-dark-softer": disabled,
                  "text-dark": !disabled,
                })}
              >
                {title}
              </h4>
              <div className="w-8"></div>
              <div className="flex items-center">
                {count > 0 && (
                  <div className="flex items-center justify-center general-text-sm px-1  bg-primary-light text-white rounded-full w-5 h-5">
                    {count}
                  </div>
                )}
                {open ? (
                  <MinusIcon
                    className={c("ml-4 w-4 h-4 fill-current", {
                      "cursor-not-allowed text-primary-soft": disabled,
                      "cursor-default text-primary-light": !disabled,
                    })}
                  />
                ) : (
                  <PlusIcon
                    className={c("ml-4 w-4 h-4 fill-current", {
                      "cursor-not-allowed text-primary-soft": disabled,
                      "cursor-default text-primary-light": !disabled,
                    })}
                  />
                )}
              </div>
            </DisclosureButton>
            <DisclosurePanel className="mt-8">
              <div className="space-y-2">{children}</div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </li>
  );
};