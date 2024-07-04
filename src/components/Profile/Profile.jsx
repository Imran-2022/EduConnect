import React, { useState, useEffect } from "react";

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
    <div className="container mx-auto px-4 py-8">
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
          <h2 className="text-xl font-bold mt-8">Tutor Profile</h2>
          {tutorProfile ? (
            <div className="border border-gray-200 p-4 rounded-lg mt-4">
              <img src={`${import.meta.env.VITE_ENDPOINT}${tutorProfile.image}`} alt={`${tutorProfile.user}'s profile`} className="w-full h-48 object-cover rounded-lg mb-4" />
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
