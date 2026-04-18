"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const tabs = [
  { title: "IT", link: "/jobs" },
  { title: "Government", link: "/jobs/government" },
  { title: "Healthcare", link: "/jobs/healthcare" },
  { title: "Marketing", link: "/jobs/marketing" },
  { title: "Internship", link: "/jobs/internship" },
];

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLDivElement | null>(null);

  // 👉 Auto scroll active tab into view (mobile)
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [pathname]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* 🔥 Sticky Glass Tabs */}
      <div className="sticky top-14 z-40 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">
        
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-3 px-4 py-3 w-max mx-auto md:justify-center">

            {tabs.map((tab, i) => {
              const active = pathname === tab.link;

              return (
                <Link key={i} href={tab.link}>
                  <div
                    ref={active ? activeRef : null}
                    className={`relative whitespace-nowrap px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-100 active:scale-95"
                    }`}
                  >
                    {tab.title}

                    {/* Glow */}
                    {active && (
                      <span className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg -z-10"></span>
                    )}
                  </div>
                </Link>
              );
            })}

          </div>
        </div>

      </div>

      {/* 📦 Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}