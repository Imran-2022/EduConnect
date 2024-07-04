import React, { useEffect, useState } from "react";

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
      const filtered = tutors.filter(tutor => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTutors.map((tutor) => (
          <div key={tutor.id} className="border border-gray-200 p-4 rounded-lg shadow-lg">
            <img src={`${tutor.image}`} alt={`${tutor.user}'s profile`} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{tutor.user}</h3>
            <p className="text-gray-600"><strong>Mobile:</strong> {tutor.mobile_no}</p>
            <p className="text-gray-600"><strong>Description:</strong> {tutor.description}</p>
            <p className="text-gray-600"><strong>Experience:</strong> {tutor.experience}</p>
            <p className="text-gray-600"><strong>Qualification:</strong> {tutor.educational_qualification}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTutor;
