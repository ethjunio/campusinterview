"use client";

import useAuthStore from "@/app/store/authStore";
import campusLogo from "@/assets/campus-logo.png";
import { useSidebarStatus } from "@/utils/customHooks";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const OnlineHeader = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  // const handleSignOut = async () => {
  //   if (logout) {
  //     await logout(router);
  //   }
  // };
  const onClick = () => {
    if (user) {
      if (logout) {
        logout(router);
      }
    } else {
      router.push("/login");
    }
  };
  const onClickRegister = () => {
    if (user) {
      if (logout) {
        logout(router);
      }
    } else {
      router.push("/register");
    }
  };

  const text = user ? "Sign Out" : "Sign In";
  // const [sidebarStatus, setSidebarStatus] = useState(false)

  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  let overviewLink = "";
  if (user && user.type === "company") {
    overviewLink = "/company/overview";
  } else if (user && user.type === "candidate") {
    overviewLink = "/candidate/overview";
  } else if (user && user.type === "admin") {
    overviewLink = "/admin/dashboard";
  }
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-0.5 bg-background h-[180px] md:h-[80px] lg:h-[55px]">
      <Link href={user ? overviewLink : "/"}>
        <div className="flex justify-center items-center gap-4">
          <img
            src={"/img/onlinecampus/OnlinecampusSimplelogo.png"}
            alt="Campus Interview"
            className="w-51 lg:w-58 h-14 sm:h-14 rounded-full object-cover"
          />
          <div className={`  ${user ? "" : "hidden"} md:block `}>
            <p className="text-[18px] lg:text-[16px] font-bold text-[#7C77FB] ">
              Online Campus Interview
            </p>
            <p className="text-[16px] lg:text-[10px] font-normal text-[#7C77FB]">
              Organized by ETH juniors
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2 lg:h-full">
        {user && (
          <button className=" px-4 flex items-center h-full text-sm font-medium bg-[#E2DFF7] text-[#5140F0] hover:bg-accent transition-colors text-[14px]">
            <span className="text-primaryPurple">
              Join our in-person event in November
            </span>
            <MoveRight size={14} className="ml-2" />
          </button>
        )}

        <button
          onClick={onClick}
          className={` px-4 py-1.5 text-sm font-medium   transition-colors
          ${pathname === "/login"
          ? "rounded-full hover:opacity-90 transition-opacity bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)] text-white"
          : "border border-primaryPurple text-primaryPurple rounded-full hover:bg-accent"}
          `}
        >
          {text}
        </button>
        {!user && (
          <button
            onClick={onClickRegister}
            className={`px-4 py-1.5 text-sm font-medium  
            ${pathname === "/register"
            ? "rounded-full hover:opacity-90 transition-opacity text-white bg-[linear-gradient(90deg,#7C77FB_63%,#6959FB_100%)]"
            : "border border-primaryPurple text-primaryPurple rounded-full hover:bg-accent"}
            `}
          >
            Register
          </button>
        )}
      </div>
      {!user && (
        <div
          className="
        order-3 w-full flex justify-center mt-3
        sm:order-none sm:w-auto lg:mt-0 
        sm:absolute sm:left-1/2 sm:-translate-x-1/2
        flex items-center gap-1 bg-card rounded-full px-2 py-1 text-sm font-medium main-menu md:po
      "
        >
          <a
            href="/looking-for-job"
            className={`px-6 py-1.5 !text-primaryPurple hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-job"
                ? "bg-primaryPurple text-white rounded-full hover:opacity-90 transition-opacity h-Onlinebtn1"
                : ""
            }`}
          >
            Student
          </a>
          <a
            href="/"
            className={`px-6 py-1.5 !text-primaryPurple hover:bg-accent rounded-full transition-colors ${
              pathname === "/"
                ? "bg-primaryPurple text-white rounded-full hover:opacity-90 transition-opacity h-Onlinebtn1"
                : ""
            }`}
          >
            Home
          </a>
          <a
            href="/looking-for-talent"
            className={`px-6 py-1.5 !text-primaryPurple hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-talent"
                ? "bg-primaryPurple text-white rounded-full hover:opacity-90 transition-opacity h-Onlinebtn1"
                : ""
            }`}
          >
            Company
          </a>
        </div>
      )}
    </nav>
  );
};

export default OnlineHeader;
