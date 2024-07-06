import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="py-36 flex items-center justify-center  min-h-[85vh]">
      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-white border">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome to <span className="text-blue-700">TutorMatch</span>
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Your platform for seamless tuition management
        </p>
        <p className="text-md text-gray-600 mb-8 text-center">
          At TutorMatch, we connect students with qualified tutors to provide personalized learning experiences. 
          <br/>Our platform offers a wide range of subjects and flexible scheduling to fit your needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/tuition"
            className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold text-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            See Available Tuition Posts
          </Link>
          <Link
            to="/available_tutor"
            className="px-6 py-3 bg-purple-500 text-white rounded-md font-semibold text-lg hover:bg-purple-600 transition duration-300 ease-in-out"
          >
            See Available Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
