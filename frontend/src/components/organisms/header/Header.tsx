"use client";
import React from "react";
import Link from "next/link";
import IconHelp from "../../../assets/icons/ic-help_circle.svg";
import IconMenu from "../../../assets/icons/ic-menu.svg";
import IconClose from "../../../assets/icons/ic-close.svg";
import { useRouter } from "next/navigation";
import classNames from "classnames"; // Updated to use classNames for readability

type Props = {
  isSignedIn: boolean;
};

const Header: React.FC<Props> = ({ isSignedIn }) => {
  const sidebarStatus = false; // Static sidebar status, for example, set it as false or true depending on your needs
  const userType = "company"; // Static user type, replace with your actual static data

  const router = useRouter();

  let overviewLink = "";
  switch (userType) {
    case "company":
      overviewLink = "/company/overview";
      break;
    // case 'candidate':
    //   overviewLink = '/candidate/overview';
    //   break;
    // case 'admin':
    //   overviewLink = '/admin/dashboard';
    //   break;
    default:
      overviewLink = "/";
  }

  return (
    <header
      className={classNames(
        "flex bg-white items-center sticky top-0 z-50 justify-between border-b border-light border-solid h-14",
        sidebarStatus ? "border-primary-light" : ""
      )}
    >
      <Link href={overviewLink}>
        <div className="cursor-pointer py-2 px-1">
          <img className="h-10 xl:h-12" src="/img/logo.svg" alt="Logo" />
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/faq">
          <a>
            <IconHelp className="w-8 h-8 fill-current" />
          </a>
        </Link>
        {isSignedIn && (
          <div
            className={classNames(
              "lg:hidden h-full flex items-center px-2",
              sidebarStatus ? "bg-primary-light" : "bg-white"
            )}
          >
            {!sidebarStatus ? (
              <IconMenu
                className="w-8 h-8 fill-current cursor-pointer"
                // Static sidebar toggle logic, no context or state changes
              />
            ) : (
              <IconClose
                className="w-8 h-8 text-white fill-current cursor-pointer"
                // Static sidebar toggle logic, no context or state changes
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
