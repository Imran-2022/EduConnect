import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TuitionPostForm = () => {
  const [formData, setFormData] = useState({
    subject:"",
    duration: "1_month",
    class_of_student: "",
    days_per_week: 1,
    required_qualification: "Bachelor",
    description: "",
  });
  const [classOptions, setClassOptions] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: "", email: "" }); // Store user data here
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id"); // Get user ID from local storage
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/users/${userId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData); // Set user data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchClassOptions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/filter/`);
        if (!response.ok) {
          throw new Error("Failed to fetch class options");
        }
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        setError("Error fetching class options");
        console.error("Error fetching class options:", error);
      }
    };

    fetchUser(); // Fetch user data
    fetchClassOptions(); // Fetch class options
  }, []); // Run once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Form Data:", {
    //   ...formData,
    //   username: user.username,
    //   email: user.email,
    //   class_of_student: formData.class_of_student,
    // });
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tuition_post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          username: user.username,
          email: user.email,
          class_of_student: formData.class_of_student,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }else{
        toast.success("successfully posted..! ");
      }

      // const data = await response.json();
      // // console.log(data);
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user_id", data.user_id);
      // if (data.user_id) {
      //   navigate("/profile");
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  return (
    <div className="container mx-auto p-8 shadow m-12 w-2/3">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Tuition Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        {error && <p className="text-red-500">{error}</p>}

        {/* Duration Field */}
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="1_month">1 Month</option>
            <option value="2_months">2 Months</option>
            <option value="3_months">3 Months</option>
            <option value="6_months">6 Months</option>
            <option value="1_year">1 Year</option>
            <option value="not_fixed">Not Fixed</option>
          </select>
        </div>

        {/* Class of Student Field */}
        <div>
          <label className="block text-sm font-medium">Class of Student</label>
          <select
            name="class_of_student"
            value={formData.class_of_student}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a Class</option>
            {classOptions.map((option) => (
              <option key={option.id} value={option.id}> {/* Updated to send ID */}
                {option.name}
              </option>
            ))}
          </select>

        </div>

        {/* Days per Week Field */}
        <div>
          <label className="block text-sm font-medium">Days per Week</label>
          <input
            type="number"
            name="days_per_week"
            min="1"
            max="7"
            value={formData.days_per_week}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
            {/* Subject Field */}
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            placeholder="which subject?"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        {/* Required Qualification Field */}
        <div>
          <label className="block text-sm font-medium">Required Qualification</label>
          <select
            name="required_qualification"
            value={formData.required_qualification}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="JSC">JSC</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Bachelor">Bachelor Degree</option>
            <option value="Master">Master Degree</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other Qualification</option>
          </select>
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="please write detailed description here"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none"
            rows={5}
            required
          />
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username} // Display the username from state
            readOnly
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100 focus:outline-none pointer-events-none"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email} // Display the email from state
            readOnly
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100 focus:outline-none pointer-events-none"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={!user.username}
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TuitionPostForm;
