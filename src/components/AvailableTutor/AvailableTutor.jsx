import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("");

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
        console.log(tutorsData);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    if (experienceFilter === "") {
      setFilteredTutors(tutors);
    } else {
      const filtered = tutors.filter((tutor) => {
        const experienceYears = parseInt(tutor.experience.match(/\d+/)); // Extract number from experience string
        if (experienceFilter === "more") {
          return experienceYears > 5;
        }
        return experienceYears >= parseInt(experienceFilter);
      });
      setFilteredTutors(filtered);
    }
  }, [experienceFilter, tutors]);

  const handleExperienceChange = (event) => {
    setExperienceFilter(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Available Tutors</h1>

      <div className="mb-4">
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Qualification</th>
              <th className="px-4 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.map((tutor, index) => {
              const isDisabled = !tutor.experience || !tutor.educational_qualification;
              return (
                <tr key={tutor.id} className="border-t">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{tutor.user}</td>
                  <td className="px-4 py-2 border">{tutor.experience}</td>
                  <td className="px-4 py-2 border">{tutor.educational_qualification}</td>
                  <td className="px-4 py-2 border">
                    {isDisabled ? (
                      <span className="text-gray-400">More</span>
                    ) : (
                      <Link to={`/available_tutor/${tutor.id}`} className="text-blue-500 hover:underline">
                        More
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableTutor;
