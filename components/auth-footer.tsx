"use client";

import Link from "next/link";
import { FaDribbble, FaGithub, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

const footerLinks = [
  { title: "Company" },
  { title: "About Us" },
  { title: "Team" },
  { title: "Products" },
  { title: "Blog" },
  { title: "Pricing" },
];

const AuthFooter = () => {
  return (
    <footer className="py-12">
      <div className="flex flex-col mx-auto items-center justify-center px-3">
        <div className="flex mb-6 gap-8 lg:gap-12">
          {footerLinks.map((link) => (
            <Link href="/" key={link.title} className="text-slate-400 sm:mb-0">
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex mb-8">
          <a href="javascript:;" className="mr-6 text-slate-400">
            <FaDribbble className="text-lg" />
          </a>
          <a href="javascript:;" className="mr-6 text-slate-400">
            <FaTwitter className="text-lg" />
          </a>
          <a href="javascript:;" className="mr-6 text-slate-400">
            <FaInstagram className="text-lg" />
          </a>
          <a href="javascript:;" className="mr-6 text-slate-400">
            <FaPinterest className="text-lg" />
          </a>
          <a href="javascript:;" className="mr-6 text-slate-400">
            <FaGithub className="text-lg" />
          </a>
        </div>
        <div>
          <p className="text-slate-400 text-sm">
            Copyright ©<script>document.write(new Date().getFullYear())</script>
            <a href="https://yogeshbisht.com" target="_blank">
              Yogesh Raj Bisht
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
