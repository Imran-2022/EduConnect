import React, { useState, useEffect } from "react";
import img1 from "../../assets/officelogoabout.png";
import img2 from "../../assets/officelogoabout1.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    problem: "",
  });

  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/users/${userId}`, {
          headers: { Authorization: `Token ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUser({ username: userData.username, email: userData.email });
        setFormData((prev) => ({
          ...prev,
          name: userData.username,
          email: userData.email,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/contact_us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          ...formData,
          username: user.username,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      else{
        toast.success("successfully submitted.! ");
        setFormData((prev) => ({
          phone: "",
          problem: "",
        }));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
};

return (
  <section className="mx-50 py-12">
     <ToastContainer />
    <div className="bg-white shadow-sm rounded gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div className="font-light text-gray-500 sm:text-lg">
        <h2 className="mb-4 text-4xl text-gray-900 font-thin first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left">
          Empowering Education, Guiding Success
        </h2>
        <p className="mb-4">
          At EduConnect, we are committed to revolutionizing education through innovative solutions.
          Our team of strategists, designers, and developers provides seamless tuition management services.
        </p>
        <p>
          We strive to be your partner in success, enhancing learning experiences and facilitating academic excellence.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <img className="w-full rounded-lg" src={img1} alt="office content 1" />
        <img className="mt-4 w-full rounded-lg lg:mt-10" src={img2} alt="office content 2" />
      </div>
    </div>

    <div className="bg-white shadow-sm rounded p-8 mx-auto max-w-screen-md mt-5 border">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md bg-gray-100 focus:outline-none pointer-events-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md bg-gray-100 focus:outline-none pointer-events-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700">problem</label>
          <textarea
            name="problem"
            id="problem"
            rows="4"
            value={formData.problem}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md focus:outline-none"
            required
          />
        </div>
        <button
          disabled={!user.username}
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
);
};

export default Contact;
