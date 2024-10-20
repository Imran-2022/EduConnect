import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TutorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/list/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch tutor");
        }
        const tutorData = await response.json();
        setTutor(tutorData);
      } catch (error) {
        console.error("Error fetching tutor:", error);
      }
    };
    fetchTutor();
  }, [id]);

  const handleTuitionRequest = () => {
    // Implement the tuition request logic here
    // console.log("Tuition request made for tutor:", tutor.id);
    const msg=`Tuition request made for tutor: ${tutor.id}`;
    toast.success(msg);
  };

  if (!tutor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
         <ToastContainer />
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      <div className="border border-gray-200 p-12  flex flex-col items-center">
        <img
          src={`${tutor.image}`}
          alt={`${tutor.user}'s profile`}
          className="w-48 h-48 object-cover rounded-full mb-4"
        />
        <div>
        <h3 className="text-lg font-semibold">User: {tutor.user}</h3>
        <p className="text-gray-600"><strong>Mobile:</strong> {tutor.mobile_no}</p>
        <p className="text-gray-600"><strong>Description:</strong> {tutor.description}</p>
        <p className="text-gray-600"><strong>Experience:</strong> {tutor.experience}</p>
        <p className="text-gray-600"><strong>Qualification:</strong> {tutor.educational_qualification}</p>
        <button
          onClick={handleTuitionRequest}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Tuition Request
        </button>
        </div>
      </div>
    </div>
  );
};

export default TutorDetail;
