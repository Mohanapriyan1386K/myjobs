import React from "react";

export default function page() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Hire the Right Talent Faster 
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Post jobs, connect with skilled candidates, and build your dream team
          with ease.
        </p>

        <button className="mt-6 bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">
          Post a Job
        </button>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-8">
          Why Companies Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Top Talent</h3>
            <p className="text-gray-600">
              Access thousands of qualified candidates ready to work.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Easy Hiring</h3>
            <p className="text-gray-600">
              Post jobs and manage applications in one place.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Fast Results</h3>
            <p className="text-gray-600">
              Find the right candidate quickly with smart matching.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-8">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-blue-600 text-xl font-bold mb-2">1</h3>
              <p className="font-medium">Create Account</p>
              <p className="text-gray-600 text-sm">
                Sign up as a recruiter
              </p>
            </div>

            <div>
              <h3 className="text-blue-600 text-xl font-bold mb-2">2</h3>
              <p className="font-medium">Post Job</p>
              <p className="text-gray-600 text-sm">
                Add job details and requirements
              </p>
            </div>

            <div>
              <h3 className="text-blue-600 text-xl font-bold mb-2">3</h3>
              <p className="font-medium">Hire Talent</p>
              <p className="text-gray-600 text-sm">
                Review and select candidates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-6">
            Trusted by Top Companies
          </h2>

          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            <span className="text-lg font-semibold">Google</span>
            <span className="text-lg font-semibold">Amazon</span>
            <span className="text-lg font-semibold">Infosys</span>
            <span className="text-lg font-semibold">TCS</span>
            <span className="text-lg font-semibold">Wipro</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Start Hiring Today
        </h2>
        <p className="mb-6 text-gray-200">
          Find the perfect candidate for your company
        </p>

        <button className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-200">
          Get Started
        </button>
      </section>

    </div>
  );
}