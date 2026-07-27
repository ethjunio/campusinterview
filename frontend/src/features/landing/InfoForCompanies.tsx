"use client";
import React, { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Ensure you have js-cookie installed
import { useRouter } from "next/navigation";
interface InfoForCompaniesProps {
  title: string;
  message: string;
  children?: ReactNode;
}

export const InfoForCompanies: FC<InfoForCompaniesProps> = ({
  title,
  message,
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    // This code will only run on the client-side
    const token = Cookies.get("accessToken");
    const dataFromStorage = localStorage.getItem("auth-storage");
    const data = JSON.parse(dataFromStorage);

    if (token && data?.state?.user?.type === "candidate") {
      router.push("/candidate");
    } else if (token && data?.state?.user?.type === "admin") {
      router.push("/admin/dashboard");
    } else if (token && data?.state.user?.type === "company") {
      router.push("/company");
    }
  }, []);

  return (
    <div className="space-y-6 lg:space-y-8 bg-transparent z-20">
      <h3 className="text-primary-light text-2xl font-extrabold lg:text-3xl">
        {title}
      </h3>
      <div className="relative max-w-md">
        <p className="text-primary-dark text-base leading-tight text-left lg:text-xl lg:leading-relaxed">
          {message}
        </p>
      </div>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
        {children}
      </div>
    </div>
  );
};
