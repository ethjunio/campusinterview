"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pb-[30px]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-6 bg-white p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* LEFT SECTION */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="space-y-2">
                <a
                  className="cursor-pointer"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.ethjuniors.ch/"
                >
                  <Image
                    src="/img/FooterImage.png" // replace with your actual logo
                    alt="ETH Juniors"
                    width={180}
                    height={60}
                  />
                </a>
                {/* <p className="text-sm text-gray-600">
                  think.create.innovate.
                </p> */}
              </div>

              {/* Address */}
              <div className="text-[#020418] text-base leading-relaxed">
                <p className="text-[#020418] text-[13px]">ETH Juniors</p>
                <p className="text-[#020418]">Hochstrasse 60a</p>
                <p className="text-[#020418]">8044 Zürich, Switzerland</p>
              </div>

              {/* Contact */}
              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a
                    href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`}
                    className="text-[#020418]"
                  >
                    campusinterview@ethjuniors.ch
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5" />
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.ethjuniors.ch/"
                    className="text-[#020418]"
                  >
                    ethjuniors.ch
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {/* Account */}
              <div className="order-1">
                <h4 className="text-[#020418] text-sm mb-3 font-thin">
                  Account
                </h4>
                <ul className="space-y-1 text-xl font-medium">
                  <li>
                    <a
                      href="/login"
                      className="hover:opacity-70 transition text-[#020418]"
                    >
                      Login
                    </a>
                  </li>

                  <li>
                    <a
                      href="/register"
                      className="hover:opacity-70 transition text-[#020418]"
                    >
                      Sign up
                    </a>
                  </li>
                </ul>
              </div>

              {/* Position */}
              <div className="col-span-2 md:col-span-1 order-3 md:order-2">
                <h4 className="text-sm mb-3 text-[#020418] text-sm mb-3 font-thin">
                  Position
                </h4>
                <ul className="space-y-1 text-xl font-medium">
                  <li>
                    <a
                      href="/looking-for-job"
                      className="hover:opacity-70 text-[#020418] text-sm mb-3"
                    >
                      Students
                    </a>
                  </li>
                  <li>
                    <a
                      href="/looking-for-job#campusStudentFaqs"
                      className="hover:opacity-70 text-[#020418] text-sm mb-3"
                    >
                      Students FAQ’s
                    </a>
                  </li>
                  <li>
                    <a
                      href="/looking-for-talent"
                      className="hover:opacity-70 text-[#020418]"
                    >
                      Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/looking-for-talent#campusCompanyFaqs"
                      className="hover:opacity-70 text-[#020418]"
                    >
                      Companies FAQ’s
                    </a>
                  </li>
                </ul>
              </div>

              {/* Policy */}
              <div className="order-2 md:order-3">
                <h4 className="text-sm mb-3 text-[#020418] text-sm mb-3 font-thin">
                  Policy
                </h4>
                <ul className="space-y-1 text-xl font-medium">
                  <li>
                    <a
                      href="https://cdn.campusinterview.ch/production/test/legal-docs/privacy-policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 text-gray-900 text-[#020418] text-sm mb-3"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
