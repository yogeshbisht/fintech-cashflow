"use client";

import Link from "next/link";
import {
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const footerLinks = [
  { title: "Company" },
  { title: "About Us" },
  { title: "Team" },
  { title: "Products" },
  { title: "Blog" },
  { title: "Pricing" },
];

const socialLinks = [
  { title: "Dribbble", icon: FaDribbble },
  { title: "Twitter", icon: FaTwitter },
  { title: "Instagram", icon: FaInstagram },
  { title: "Pinterest", icon: FaPinterest },
  { title: "Github", icon: FaGithub },
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
          {socialLinks.map((link) => (
            <Link href="#" key={link.title} className="mr-6 text-slate-400">
              <link.icon className="text-lg" />
            </Link>
          ))}
        </div>
        <div className="text-slate-400 text-sm">
          Copyright © {new Date().getFullYear()}
          <a
            href="https://yogeshbisht.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yogesh Raj Bisht
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
