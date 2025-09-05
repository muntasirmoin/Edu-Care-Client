// Footer.tsx
import Logo from "@/components/logo";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-violet-50 dark:bg-violet-900 border-t border-violet-200 dark:border-violet-700 transition-colors">
      {/* Main 4-column content */}
      {/* <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> */}
      <div className="mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* 1. Logo & Brand */}
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-violet-700 dark:text-violet-300 hover:text-violet-500 dark:hover:text-violet-200 transition text-lg font-bold"
            >
              <Logo />
            </Link>
            <span className="text-violet-700 dark:text-violet-200 font-bold text-lg">
              EduCare
            </span>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-violet-700 dark:text-violet-200 mb-2">
            Quick Links
          </h3>
          <Link
            to="/"
            className="text-violet-600 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-50 transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-violet-600 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-50 transition"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-violet-600 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-50 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-violet-600 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-50 transition"
          >
            Contact
          </Link>
        </div>

        {/* 3. Contact Info */}
        <div className="flex flex-col items-center text-center gap-2">
          <h3 className="font-semibold text-violet-700 dark:text-violet-200 mb-2">
            Contact
          </h3>
          <span className="flex items-center gap-1 justify-center text-violet-600 dark:text-violet-300">
            <Phone size={14} /> +880 1768-968-938
          </span>
          <span className="flex items-center gap-1 justify-center text-violet-600 dark:text-violet-300">
            <MapPinIcon size={14} /> Sylhet, Bangladesh
          </span>
          <span className="flex items-center gap-1 justify-center text-violet-600 dark:text-violet-300">
            <Mail size={14} /> info@educare.com
          </span>
        </div>

        {/* 4. Social Links */}
        <div className="flex justify-center flex-col gap-2">
          <h3 className="font-semibold text-violet-700 dark:text-violet-200 mb-2">
            Follow Us
          </h3>
          <div className="flex gap-3 justify-center md:justify-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-200 hover:text-violet-800 dark:hover:text-violet-50 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-200 hover:text-violet-800 dark:hover:text-violet-50 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-200 hover:text-violet-800 dark:hover:text-violet-50 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:info@educare.com"
              className="text-violet-600 dark:text-violet-200 hover:text-violet-800 dark:hover:text-violet-50 transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom centered copyright */}
      <div className="border-t border-violet-200 dark:border-violet-700 py-4 text-center text-violet-600 dark:text-violet-300 text-sm">
        © 2025 EduCare. All rights reserved.
      </div>
    </footer>
  );
}
