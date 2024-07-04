import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
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

    fetchUser();
    fetchApplications();
  }, [userId]); // Fetch user data when userId changes or component mounts

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
                    post no -  {application.tuition_post}
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
