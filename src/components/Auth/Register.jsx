import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = inputs;

        // Validate password and confirmPassword
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Handle registration logic
        console.log(email, password, confirmPassword);
        // You can add your registration API call or logic here
    };

    return (
            <div className="flex flex-col items-center justify-center w-full  py-2 text-gray-700">
                <form className="flex flex-col bg-white rounded shadow-lg p-12 my-10" onSubmit={handleSubmit}>
                    <h2 className="text-3xl mb-6 font-semibold text-center">Register</h2>
                    <label className="font-semibold text-xs" htmlFor="usernameField">User Name</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="text"
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    <label className="font-semibold text-xs mt-3" htmlFor="useremailField">User Email</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <label className="font-semibold text-xs mt-3" htmlFor="confirmPasswordField">Confirm Password</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />
                    <button
                        className="flex items-center justify-center h-12 px-6 w-80 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
                        type="submit"
                    >
                        Register
                    </button>
                    <div className="flex mt-6 justify-center text-xs">
                        <span>Already have an account? </span>
                        <Link to="/login" className="text-blue-400 hover:text-blue-500">Login</Link>
                    </div>
                </form>
            </div>
    );
};

export default Register;
