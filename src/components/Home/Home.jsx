import React from "react";

const Home = () => {
  return (
    <div className=" py-36 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Welcome to <span className="text-blue-700">TutorMatch</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Your platform for seamless tuition management
        </p>
        <div className="flex justify-center">
          <a
            href="/tuition"
            className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold text-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
