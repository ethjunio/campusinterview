"use client"
import React, { useState } from "react";

import Link from "next/link";
import c from "classnames";
import Image from "next/image";
import IconHelp from "../../assets/icons/ic-help_circle.svg";
import IconMenu from "../../assets/icons/ic-menu.svg";
import IconClose from "../../assets/icons/ic-close.svg";

import useAuthStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useSidebarStatus } from "@/utils/customHooks";



const Header = () => {

  const { user, logout } = useAuthStore(); 
  const router = useRouter()

  // const handleSignOut = async () => {
  //   if (logout) {
  //     await logout(router);
  //   }
  // };
  const onClick = ()=> {
    if (user) {
      if (logout) {
        logout(router);
      }
    } else {
      router.push('/login');
    }
  }


  const text = user ? "Sign Out" : "Sign In";
  // const [sidebarStatus, setSidebarStatus] = useState(false)

  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  let overviewLink = '';
  if (user && user.type === 'company') {
    overviewLink = '/company/overview';
  } else if (user && user.type === 'candidate') {
    overviewLink = '/candidate/overview';
  } else if (user && user.type === 'admin') {
    overviewLink = '/admin/dashboard';
  }


  return (
    <header
      className={c(
        'flex bg-white items-center sticky top-0 z-50 justify-between border-b border-light border-solid h-14',
        sidebarStatus ? 'border-primary-light' : '',
      )}>
      <Link href={user ? overviewLink : '/'}>
        <div
          className="cursor-pointer py-2 px-1"
          onClick={() => {
            setSidebarStatus(false);
          }}>
          <img className="h-10 xl:h-12" src="/img/updatedlogo.png" />
        </div>
      </Link>
      <div className="hstack hstack-2 items-center self-stretch height-60">
        <div className="vr vr-light self-stretch" />
        <a onClick={onClick}>{text}</a>
        <div className="vr vr-light self-stretch" />
        <div className="text-primary-light">
          <Link href="/faq">
              <IconHelp className="w-8 h-8 fill-current" />
          </Link>
        </div>
        <div
          style={{ marginRight: '0px!important' }}
          className="vr vr-light self-stretch"
        />

        {user ? (
          <div
            className={c(
              'lg:hidden h-full flex items-center px-2',
              sidebarStatus ? 'bg-primary-light' : 'bg-white',
            )}>
            <div className="text-primary-light ">
              {!sidebarStatus ? (
                <IconMenu
                  className="w-8 h-8 fill-current cursor-pointer"
                  onClick={toggleSidebar}
                />
              ) : (
                <IconClose
                  className="w-8 h-8 text-white fill-current cursor-pointer"
                  onClick={toggleSidebar}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
