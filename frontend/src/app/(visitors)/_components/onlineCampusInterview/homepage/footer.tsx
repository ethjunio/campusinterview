"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto px-6 bg-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* LEFT SECTION */}
            <div className="space-y-8">
              
              {/* Logo */}
              <div className="space-y-2">
                <Image
                  src="/img/FooterImage.png" // replace with your actual logo
                  alt="ETH Juniors"
                  width={180}
                  height={60}
                />
                {/* <p className="text-sm text-gray-600">
                  think.create.innovate.
                </p> */}
              </div>

              {/* Address */}
              <div className="text-gray-800 text-base leading-relaxed">
                <p className="text-gray-700">ETH Juniors</p>
                <p className="text-gray-700">Hochstrasse 60a</p>
                <p   className="text-gray-700">8044 Zürich, Switzerland</p>
              </div>

              {/* Contact */}
              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span  className="text-gray-700">campusinterview@ethjuniors.ch</span>
                </div>

                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5" />
                  <span  className="text-gray-700">ethjuniors.ch</span>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              
              {/* Account */}
              <div className="order-1">
                <h4 className="text-gray-500 text-sm mb-3">Account</h4>
                <ul className="space-y-1 text-xl font-medium">
                <li>
                    <a href="/login" className="hover:opacity-70 transition text-gray-900">
                      Login
                    </a>
                  </li>
                  
                  <li>
                    <a href="/register" className="hover:opacity-70 transition text-gray-900">
                      Sign up
                    </a>
                  </li>
                </ul>
              </div>

              {/* Position */}
              <div className="col-span-2 md:col-span-1 order-3 md:order-2">
                <h4 className="text-gray-500 text-sm mb-3">Position</h4>
                <ul className="space-y-1 text-xl font-medium">
                  <li><a href="#" className="hover:opacity-70 text-gray-900">Students</a></li>
                  <li><a href="#" className="hover:opacity-70 text-gray-900">Students FAQ’s</a></li>
                  <li><a href="#" className="hover:opacity-70 text-gray-900">Companies</a></li>
                  <li><a href="#" className="hover:opacity-70 text-gray-900">Companies FAQ’s</a></li>
                </ul>
              </div>

              {/* Policy */}
              <div className="order-2 md:order-3">
                <h4 className="text-gray-500 text-sm mb-3">Policy</h4>
                <ul className="space-y-1 text-xl font-medium">
                  <li><a href="#" className="hover:opacity-70 text-gray-900">Imprint</a></li>
                  <li><a href="https://cdn.campusinterview.ch/production/test/legal-docs/privacy-policy.pdf" className="hover:opacity-70 text-gray-900">Privacy Policy</a></li>
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