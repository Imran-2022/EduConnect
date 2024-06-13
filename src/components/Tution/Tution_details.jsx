import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Tuition_details = () => {
    const { id } = useParams();
    const [tuitionData, setTuitionData] = useState(null); // Initialize as null initially

    useEffect(() => {
        const fetchTuitionData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_ENDPOINT}/tuition_post/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch tuition data");
                }
                const data = await response.json();
                setTuitionData(data);
            } catch (error) {
                console.error("Error fetching tuition data:", error);
            }
        };

        fetchTuitionData();
    }, [id]);

    const handleApply = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/application/apply/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    tuition_post: id
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to apply for tuition');
            }

            alert('Application submitted successfully!');
            // Optionally, update the UI or redirect the user
        } catch (error) {
            console.error('Error applying for tuition:', error);
            alert(error.message || 'Failed to apply for tuition');
        }
    };

    return (
        <div className="py-9">
            {tuitionData ? (
                <div className="bg-white shadow-md rounded-sm overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Tuition Details</h2>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Class {tuitionData.class_of_student} Tuition Offer
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Posted on: {tuitionData.creation_time}
                            </p>
                            <p className="text-base text-gray-700 text-justify">
                                {tuitionData.description}
                            </p>
                            <p className="text-base text-gray-700 text-justify py-2 font-semibold">
                                <span className="">Required qualification: </span>
                                {tuitionData.required_qualification}
                            </p>
                            <p className="text-base text-gray-700 text-justify py-2 font-semibold">
                                <span className="">Days per week: </span>
                                {tuitionData.days_per_week}
                            </p>
                        </div>
                        <Link
                            to="/tuition"
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300"
                        >
                            Go Back
                        </Link>
                        <button
                            className="inline-block ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-300"
                            onClick={handleApply}
                        >
                            Apply Here
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Tuition_details;
