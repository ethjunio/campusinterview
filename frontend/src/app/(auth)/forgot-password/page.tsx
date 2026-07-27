import React from "react";

import { Metadata } from "next";
import ForgotPasswordBegin from "./_components/ForgotPasswordBegin";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

const page = () => {
  return <ForgotPasswordBegin />;
};

export default page;
