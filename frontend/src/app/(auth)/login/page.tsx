import React from "react";

import { LoginForm } from "./_components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
