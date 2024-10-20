import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="py-12 flex items-center justify-center  min-h-[65vh]">
      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-white border">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome to <span className="text-[#029fff] ">TutorMatch</span>
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
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            See Available Tuition Posts
          </Link>
          <Link
            to="/available_tutor"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            See Available Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
