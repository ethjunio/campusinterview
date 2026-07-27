import React from "react";

import { Metadata } from "next";
import ForgotPasswordSent from "./_components/ForgotPasswordSent";

export const metadata: Metadata = {
  title: "Forgot Password Sent",
  description: "Forgot Password Sent",
};

const page = () => {
  return <ForgotPasswordSent />;
};

export default page;
