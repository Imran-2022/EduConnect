import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
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

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/application/user-applications/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const applicationsData = await response.json();
        setApplications(applicationsData);
        // console.log(applicationsData);
      } catch (error) {
        console.error('Error fetching applications:', error);
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
    fetchApplications();
    fetchTutorProfile();
  }, [userId]);

  const handleDeleteTutorProfile = async (id) => {
    console.log("id",id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/user-tutor-profile/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
  
      if (response.status === 204) {
        // alert('Tutor profile deleted successfully.');
        toast.success('Tutor profile deleted successfully.');
        setTutorProfile(null); // Update the state after deletion
      } else {
        throw new Error('Failed to delete tutor profile');
      }
    } catch (error) {
      console.error('Error deleting tutor profile:', error);
      alert('Error deleting tutor profile.');
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8 min-h-[90vh]">
      <ToastContainer />
      {user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>First Name:</strong> {user.first_name}</p>
            </div>
            <div>
              <p><strong>Last Name:</strong> {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Superuser:</strong> {user.is_superuser ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <h2 className="text-xl font-bold">Tutor Profile</h2>
            <Link to="create"><button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 bg-cyan-400">
            <svg
              className="w-4 h-4 me-2 -ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 256c-70.69 0-128-57.31-128-128S185.31 0 256 0s128 57.31 128 128-57.31 128-128 128zm0 32c70.69 0 256 35.29 256 106.99v19.97c0 15.09-12.24 28.99-27.78 28.99H27.78C12.24 442.99 0 429.09 0 414v-19.97C0 323.29 185.31 288 256 288z"
              />
            </svg>
            Create/Update Tutor Profile
            </button></Link>
          </div>

          {tutorProfile ? (
            <div className="border border-gray-200 p-4 rounded-lg mt-4">
              <img src={`${import.meta.env.VITE_ENDPOINT}${tutorProfile.image}`} alt={`${tutorProfile.user}'s profile`} className="w-48 h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{tutorProfile.user}</h3>
              <p className="text-gray-600"><strong>Mobile:</strong> {tutorProfile.mobile_no}</p>
              <p className="text-gray-600"><strong>Description:</strong> {tutorProfile.description}</p>
              <p className="text-gray-600"><strong>Experience:</strong> {tutorProfile.experience}</p>
              <p className="text-gray-600"><strong>Qualification:</strong> {tutorProfile.educational_qualification}</p>
               {/* Delete Button */}
              <button
                onClick={()=>handleDeleteTutorProfile(tutorProfile.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete Tutor Profile
              </button>
            </div>
          ) : (
            <p>No tutor profile found.</p>
          )}
          <h2 className="text-xl font-bold mt-8">Applied Posts</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Applied Tuition Post</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
                <th className="border border-gray-200 px-4 py-2">Application Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="border border-gray-200 px-4 py-2 underline underline-offset-8">
                    <a href={`http://localhost:5173/tuition/${application.tuition_post}`}>
                      {application.tuition_post}
                    </a>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{application.status}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(application.application_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
