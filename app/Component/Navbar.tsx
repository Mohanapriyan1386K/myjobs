"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "about", href: "/" },
  { name: "Find Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Post Job", href: "/post-job" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-xl font-bold text-blue-400">JobPortal</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative pb-1 transition 
                    ${isActive ? "text-blue-400" : "hover:text-blue-400"}
                  `}
                >
                  {link.name}

                  {/* Active Underline */}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-800">
              Login
            </button>
            <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600">
              Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-800 px-4 pb-4">
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href);

            return (
              <Link
                key={index}
                href={link.href}
                className={`block py-2 border-b border-gray-700 ${
                  isActive ? "text-blue-400 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button className="w-full mt-3 border border-gray-400 py-2 rounded">
            Login
          </button>
          <button className="w-full mt-2 bg-blue-500 py-2 rounded">
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}
