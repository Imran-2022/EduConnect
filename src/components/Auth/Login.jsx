import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log(e.target.email.value,e.target.password.value)
    };

    return (
        <div className="py-10 flex items-center justify-center ">
            <form className="flex flex-col bg-white rounded shadow-lg p-12 w-96" onSubmit={handleSubmit}>
                <label className="font-semibold text-xs" htmlFor="usernameField">User Email</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    required
                />
                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    required
                />
                <button className="h-12 mt-8 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" type="submit">Login</button>
                <div className="flex mt-6 justify-center text-xs">
                    <Link to="/forget-password" className="text-blue-400 hover:text-blue-500">Forgot Password</Link>
                    <span className="mx-2 text-gray-300">/</span>
                    <Link to="/register" className="text-blue-400 hover:text-blue-500">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
