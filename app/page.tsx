"use client";
import React from "react";

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            About JobPortal
          </h1>
          <p className="text-lg opacity-90">
            Connecting talented people with the right opportunities.
            Find jobs faster and hire smarter with our modern platform.
          </p>

          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
            Get Started
          </button>
        </div>

        {/* Glow Effect */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 blur-3xl"></div>
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 right-10 blur-3xl"></div>
      </section>


      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="team"
          className="rounded-2xl shadow-xl hover:scale-105 transition duration-300"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We help job seekers discover meaningful opportunities and
            empower companies to hire the best talent effortlessly.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our platform bridges the gap between talent and companies,
            making hiring simple, fast, and efficient.
          </p>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Job Search", desc: "Explore thousands of opportunities." },
              { title: "Easy Apply", desc: "Apply quickly with one click." },
              { title: "Post Jobs", desc: "Hire the best candidates easily." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <h3 className="font-semibold text-xl mb-3 text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">

          {[
            { num: "10K+", label: "Jobs Posted" },
            { num: "5K+", label: "Companies" },
            { num: "20K+", label: "Candidates" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-4xl font-bold text-blue-600 mb-2">
                {stat.num}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to find your dream job?
        </h2>

        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 hover:scale-105 transition">
          Start Now
        </button>
      </section>

    </div>
  );
}