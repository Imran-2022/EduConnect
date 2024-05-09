import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        first_name:"",
        last_name:"",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, first_name,last_name,email, password, confirm_password } = inputs;

        // Validate password and confirmPassword
        if (password !== confirm_password) {
            alert("Passwords do not match");
            return;
        }

        // Handle registration logic

        //  into this url - http://127.0.0.1:8000/tutor/register/

        // console.log({username, first_name,last_name,email, password, confirm_password })

        const info={username, first_name,last_name,email, password, confirm_password };
        fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/register/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Note the quotes around 'Content-Type'
            },
            body: JSON.stringify(info),
          })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

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
                    <label className="font-semibold text-xs mt-3" htmlFor="usernameField">First Name</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="text"
                        name="first_name"
                        value={inputs.first_name}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                    />
                    <label className="font-semibold text-xs mt-3" htmlFor="usernameField">Last Name</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="text"
                        name="last_name"
                        value={inputs.last_name}
                        onChange={handleChange}
                        placeholder="Enter your last name"
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
                    <label className="font-semibold text-xs mt-3" htmlFor="confirm_passwordField">Confirm Password</label>
                    <input
                        className="flex items-center h-12 px-4 w-80 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                        type="password"
                        name="confirm_password"
                        value={inputs.confirm_password}
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
