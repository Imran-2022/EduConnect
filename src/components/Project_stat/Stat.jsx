import React from "react";

const Stat = () => {
  // Sample data for statistics
  const statsData = [
    { label: "Total Tution Posts", value: 150 },
    { label: "Total Applied Users", value: 250 },
    { label: "Total Users", value: 500 },
    { label: "Users who got Tution after Applying", value: 100 },
    { label: "Total Tuition Posts", value: 75 },
    // Add more statistics as needed
  ];

  const calculatePercentage = (value, total) => {
    return total !== 0 ? ((value / total) * 100).toFixed(2) : 0;
  };

  // Sample data for timeline with statistics
  const timelineData = statsData.map(({ label, value }) => ({
    title: label,
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    description: `${label}: ${value}, Percentage: ${calculatePercentage(
      value,
      statsData[2].value
    )}%`,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 flex justify-center">
        <ol className="relative border-s border-gray-200 dark:border-gray-700 w-full max-w-lg">
          {timelineData.map((item, index) => (
            <li
              key={index}
              className={`${
                index !== timelineData.length - 1 ? "mb-10" : ""
              } ms-0 md:ms-6`}
            >
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Stat;
