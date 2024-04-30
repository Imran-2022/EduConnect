import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* filter part */}

      <div>
        <h1 className="text-3xl font-bold mb-6">Filter</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Total Tuition Posts : 150
          </h2>
        </div>
      </div>

      {/* tuition posts part */}
      
      <div>
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Class Five Tuition offer
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            class Five
          </time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard
          </p>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg
              className="w-3.5 h-3.5 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>{" "}
            view Details
          </a>
        </li>
        {/* Add more timeline items */}
      </ol>
      </div>

      
    </div>
  );
};

export default Profile;
