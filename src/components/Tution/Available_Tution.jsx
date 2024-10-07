import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Available_Tuition = () => {
  const [tuitionData, setTuitionData] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/filter/`);
        if (!response.ok) {
          throw new Error("Failed to fetch class options");
        }
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        console.error("Error fetching class options:", error);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    const fetchTuitionData = async () => {
      try {
        let url = `${import.meta.env.VITE_ENDPOINT}/tuition_post/`;
        if (selectedClass && selectedClass !== "any") {
          url += `?class_of_student=${selectedClass}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tuition data");
        }
        const data = await response.json();
        setTuitionData(data);
      } catch (error) {
        console.error("Error fetching tuition data:", error);
      }
    };

    fetchTuitionData();
  }, [selectedClass]);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Function to filter tuition posts based on the search term
  const filteredTuitionData = tuitionData.filter(tuition => 
    tuition.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tuition.qualification?.toLowerCase().includes(searchTerm.toLowerCase())||
    tuition.class_of_student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 flex min-h-[90vh]">
      <div className="w-1/5 pr-8">
        <h1 className="text-3xl font-bold mb-6">Filter</h1>
        
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-8">
          <h6 className="text-sm font-semibold mb-2">Filter by Class</h6>
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="any">Any Class</option>
            {classOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-4/5">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {filteredTuitionData.map((tuition) => (
            <li key={tuition.id} className="mb-10 ms-6">
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                Class {tuition.class_of_student} Tuition offer
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {tuition.class_of_student}
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {truncateText(tuition.description, 15)}
              </p>
              <Link
                to={`/tuition/${tuition?.id}`}
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
                </svg>
                View Details
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Available_Tuition;
