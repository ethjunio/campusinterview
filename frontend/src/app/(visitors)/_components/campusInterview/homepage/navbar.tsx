"use client";

import useAuthStore from "@/app/store/authStore";
import campusLogo from "@/assets/campus-logo.png";
import { useSidebarStatus } from "@/utils/customHooks";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
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
    <nav className="relative flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-2 bg-background h-[140px] md:h-[80px] lg:h-[59px]">
      <Link href={user ? overviewLink : "/"}>
        <img
          src={"/img/Campuslogo1.png"}
          alt="Campus Interview"
          className="rounded-full object-cover"
        />
      </Link>
      {/* {!user && (
        <div className="flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1 text-sm font-medium main-menu">
          <a
            href="/looking-for-job"
            className={`px-3 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-job"
                ? "bg-primary text-white rounded-full hover:opacity-90 transition-opacity h-btn1"
                : ""
            }`}
          >
            Student
          </a>
          <a
            href="/"
            className={`px-3 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/"
                ? "bg-primary text-whote rounded-full hover:opacity-90 transition-opacity h-btn1"
                : ""
            }`}
          >
            Home
          </a>
          <a
            href="/looking-for-talent"
            className={`px-3 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-talent"
                ? "bg-primary text-white rounded-full hover:opacity-90 transition-opacity h-btn1"
                : ""
            }`}
          >
            Company
          </a>
        </div>
      )} */}

      <div className="flex items-center gap-2  lg:h-full">
      {user && (
          
          <button className="px-4 flex items-center h-full text-sm font-medium bg-[#D8E4FF] text-PrimaryBlue hover:bg-accent transition-colors text-[14px]">
            <span className="text-PrimaryBlue">Join our in-person event in November</span>
    <MoveRight size={14} className="ml-2" />
          </button>
          )}
        <button
          onClick={onClick}
          className={`px-4 py-1.5 text-sm font-medium border border-primary text-primary rounded-full hover:bg-accent transition-colors h-btn

          ${pathname === "/login"
          ? " rounded-full hover:opacity-90 transition-opacity h-btn1"
          : "border border-primary text-primary rounded-full hover:bg-accent transition-colors h-btn"}
          
        `}
        >
          {text}
        </button>
        {!user && (
          <button
            onClick={onClickRegister}
            className={`px-4 py-1.5 text-sm font-medium 
            ${pathname === "/register"
            ? "bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity h-btn1"
            : "border border-primary text-primary rounded-full hover:bg-accent transition-colors h-btn"}
            
          

`}
          >
            Register
          </button>
        )}
      </div>
      {!user && (
        <div
          className="
        order-3 w-full flex justify-center mt-3   sm:order-none sm:w-auto lg:mt-0    sm:absolute sm:left-1/2 sm:-translate-x-1/2   flex items-center gap-1 bg-card rounded-full px-2 py-1 text-sm font-medium main-menu md:po
      "
        >
          <a
            href="/looking-for-job"
            className={`px-6 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-job"
                ? "bg-primary text-white rounded-full hover:opacity-90 transition-opacity h-btn1"
                : ""
            }`}
          >
            Student
          </a>
          <a
            href="/"
            className={`px-6 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/"
                ? "bg-primary text-whote rounded-full hover:opacity-90 transition-opacity h-btn1"
                : ""
            }`}
          >
            Home
          </a>
          <a
            href="/looking-for-talent"
            className={`px-6 py-1.5 text-primary hover:bg-accent rounded-full transition-colors ${
              pathname === "/looking-for-talent"
                ? "bg-primary text-white rounded-full hover:opacity-90 transition-opacity h-btn1"
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

export default Header;
