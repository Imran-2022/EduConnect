import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom';

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
        console.log(applicationsData);
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

  return (
    <div className="container mx-auto px-4 py-8 min-h-[90vh]">
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
            <Link to="create"><button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
            <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
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
            </div>
          ) : (
            <p>No tutor profile found.</p>
          )}
          <h2 className="text-xl font-bold mt-8">Applied Posts</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Tuition Post</th>
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
