import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/list/`);
        if (!response.ok) {
          throw new Error("Failed to fetch tutors");
        }
        const tutorsData = await response.json();
        setTutors(tutorsData);
        setFilteredTutors(tutorsData);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    const filtered = tutors.filter((tutor) => {
      const experienceYears = parseInt(tutor.experience.match(/\d+/)) || 0;
      const matchesExperience =
        experienceFilter === "" ||
        (experienceFilter === "more" ? experienceYears > 5 : experienceYears >= parseInt(experienceFilter));

      const matchesSearch =
        tutor.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.educational_qualification.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesExperience && matchesSearch;
    });

    setFilteredTutors(filtered);
  }, [experienceFilter, searchQuery, tutors]);

  const handleExperienceChange = (event) => {
    setExperienceFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8 my-6">
      <h1 className="text-2xl font-bold mb-4">Available Tutors</h1>

      <div className="mb-4 flex items-center">
        <div className="mr-4">
          <label htmlFor="experienceFilter" className="mr-2">Filter by years of experience:</label>
          <select
            id="experienceFilter"
            value={experienceFilter}
            onChange={handleExperienceChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="more">More than 5 Years</option>
          </select>
        </div>

        <div>
          <label htmlFor="searchQuery" className="mr-2">Search:</label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
            placeholder="Search here"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredTutors.map((tutor) => {
          const isDisabled = !tutor.experience || !tutor.educational_qualification;
          return (
            <div key={tutor.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <img src={tutor.image || "placeholder-image-url"} alt={tutor.user} className="w-full h-48 object-cover rounded-md mb-2" />
              <h2 className="text-gray-600">User : {tutor.user}</h2>
              <p className="text-gray-600">Experience : {tutor.experience}</p>
              <p className="text-gray-600">Qualification : {tutor.educational_qualification}</p>
              <div className="mt-2 w-full">
                {isDisabled ? (
                  <span className="text-gray-400">More</span>
                ) : (
                  <Link to={`/available_tutor/${tutor.id}`}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-gray-100 border border-gray-200 rounded-lg focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full">
                    More Details
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableTutor;
