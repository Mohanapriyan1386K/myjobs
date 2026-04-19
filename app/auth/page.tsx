"use client";

import Image from "next/image";
import Images from "../utils/image";
import { CustomInput } from "../Component/CustomInput";

export default function Page() {
  return (
    <div className="h-screen flex">

      {/* LEFT SIDE (IMAGE) */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src={Images.Login}
          alt="bg"
          fill
          className="object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white p-10 flex flex-col justify-start">
          <h1 className="text-4xl font-bold">Welcome Back 💪</h1>
          <p className="mt-2 text-gray-200">
            Build your body. Build your confidence.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#000000] px-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold mb-2 text-center">
            GYM NATION
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Login to your account
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <CustomInput
              label="Email"
              type="email"
              placeholder="Enter email"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <CustomInput
              label="Password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>

          {/* DIVIDER */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-black" />
            <span className="text-sm text-blue-500">OR</span>
            <div className="flex-1 h-px bg-black" />
          </div>

          {/* GOOGLE BUTTON */}
          <button className="bg-white w-full flex items-center justify-center gap-2 p-2 rounded-lg shadow-md hover:shadow-lg transition border">
            <Image
              alt="google"
              src={Images.google}
              width={20}
              height={20}
            />
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}