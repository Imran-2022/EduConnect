import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProfile = () => {
  const [user, setUser] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/users/${userId}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchTutorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/user-tutor-profile/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.status === 404) {
          setTutorProfile(null);
        } else if (!response.ok) {
          throw new Error('Failed to fetch tutor profile');
        } else {
          const tutorData = await response.json();
          setTutorProfile(tutorData);
        }
      } catch (error) {
        console.error('Error fetching tutor profile:', error);
      }
    };

    fetchUser();
    fetchTutorProfile();
  }, [userId]);

  const [image, setImage] = useState(null); // Updated to null for file handling
  const [mobileNo, setMobileNo] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');

  useEffect(() => {
    if (tutorProfile) {
      setImage(tutorProfile.image);
      setMobileNo(tutorProfile.mobile_no);
      setDescription(tutorProfile.description);
      setExperience(tutorProfile.experience);
      setQualification(tutorProfile.educational_qualification);
    }
  }, [tutorProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('image', image);
    formData.append('mobile_no', mobileNo);
    formData.append('description', description);
    formData.append('experience', experience);
    formData.append('educational_qualification', qualification);

    try {
      const token = localStorage.getItem('token');
      let response;
      if (tutorProfile) {
        // Update existing profile
        response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/user-tutor-profile/`, {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${token}`
          },
          body: formData
        });
      } else {
        // Create new profile
        response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/user-tutor-profile/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          },
          body: formData
        });
      }
      if (!response.ok) {
        toast.error("Failed to Saved !");
        throw new Error('Failed to save tutor profile');
      }else{
        toast.success("successfully Saved !");
      }
      const updatedProfile = await response.json();
      setTutorProfile(updatedProfile);
      // Optionally, display a success message or redirect after successful update
    } catch (error) {
      console.error('Error saving tutor profile:', error);
      // Handle error states or display error messages
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      {user ? (
        <div>
          <div className="flex justify-between mt-8">
            <h2 className="text-xl font-bold">Create/Update Tutor Profile</h2>
            <Link to="/profile">
              <button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
                Back to Profile
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="my-4 pb-8 pt-4 px-12 border">
            <div className="my-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"  // Changed input type to file
                id="image"
                // value={image}
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNo"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none sm:text-sm rounded-md"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none sm:text-sm rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none sm:text-sm rounded-md"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none sm:text-sm rounded-md"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 w-full flex justify-center  "
              >
                Save Profile
              </button>
            </div>

          </form>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default CreateProfile;
