import { NavLink } from "react-router-dom";


const Header = () => {

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/tuition">Available Tuition </NavLink></li>
        <li><NavLink to="/statistics">Statistics</NavLink></li>
        <li><NavLink to="/blogs">Blogs</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <p className="normal-case text-xl">EduConnect</p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-1">
                {/* <NavLink to="/apply" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Apply Now</NavLink> */}
                {/* <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Profile</NavLink> */}
                {/* <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Logout</NavLink> */}
                <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Login</NavLink>
                <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Register</NavLink>
            </div>
        </div>
    );
};

export default Header;