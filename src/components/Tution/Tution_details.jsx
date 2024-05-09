// Import necessary dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

// Define your Tuition_details component
const Tuition_details = () => {
  // Define state to store the fetched data
  const [tuitionData, setTuitionData] = useState({});
  const { id } = useParams(); // Get the ID from URL params

  useEffect(() => {
    const fetchTuitionData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_ENDPOINT}/tuition_post/${id}` // Fetch specific tuition using ID
        );
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
  }, [id]); // Add id to dependency array to re-fetch data when ID changes

  return (
    <div className="py-9">
      <div className="  bg-white shadow-md rounded-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Tuition Details</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Class {tuitionData.class_of_student} Tuition Offer
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Posted on: {tuitionData.creation_time}
            </p>
            <p className="text-base text-gray-700 text-justify">
              {tuitionData.description}
            </p>
            <p className="text-base text-gray-700 text-justify py-2 font-semibold">
                <span className="">Required qualification: </span>
              {tuitionData.required_qualification}
            </p>
            <p className="text-base text-gray-700 text-justify py-2 font-semibold">
                <span className="">Day's per week : </span>
              {tuitionData.days_per_week}
            </p>
          </div>
          {/* Link to go back to the previous page */}
          <Link
            to="/tuition" // Assuming "/tuitions" is your main tuitions page route
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300"
          >
            Go Back
          </Link>
          <button className="inline-block ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-300">
            Apply Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tuition_details;
