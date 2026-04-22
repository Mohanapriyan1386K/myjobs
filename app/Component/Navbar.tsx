"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: "About", href: "/" },
  { name: "Find Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1 className="text-xl font-bold text-blue-400 cursor-pointer">
            JobPortal
          </h1>

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

                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4 relative">
            {session ? (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="profile"
                    className="w-9 h-9 rounded-full border"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full border bg-blue-500 flex items-center justify-center text-sm font-semibold">
                    {String(session?.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{session.user.name}</span>
                <ChevronDown size={16} />

                {/* Dropdown */}
                {dropdown && (
                  <div className="absolute right-0 top-12 bg-white text-black rounded shadow-lg w-40">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </button>

                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-800"
                onClick={() => router.push("/auth")}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-2">

          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={index}
                href={link.href}
                className={`block py-2 ${
                  isActive ? "text-blue-400 font-semibold" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {session ? (
            <>
              <div className="flex items-center gap-2 mt-3">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
                    {String(session?.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{session.user.name}</span>
              </div>

              <button
                className="w-full mt-2 bg-gray-700 py-2 rounded"
                onClick={() => router.push("/profile")}
              >
                Profile
              </button>

              <button
                className="w-full mt-2 bg-red-500 py-2 rounded"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="w-full mt-3 border border-gray-400 py-2 rounded"
              onClick={() => router.push("/auth")}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
