const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                <aside className="flex flex-col items-center md:items-start">
                    {/* Updated SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 fill-current mb-2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        <path d="M12 5.13a6.867 6.867 0 0 0-4.865 2.035l1.536 1.536A4.295 4.295 0 0 1 12 8c1.53 0 2.893.786 3.607 2.023l1.532-1.532A6.867 6.867 0 0 0 12 5.13z" />
                        <path d="M17.413 14.313a4.2 4.2 0 0 0-2.776-1.027 4.299 4.299 0 0 0-4.299 4.299v.02l1.63 1.63a6.871 6.871 0 0 0 6.628-5.77z" />
                    </svg>
                    <p className="text-center font-semibold">TutorMatch</p>
                    <p className="text-center text-sm">Connecting learners and educators</p>
                </aside>
                <nav>
                    <h4 className="footer-title font-semibold mb-2">Services</h4>
                    <ul className="space-y-1">
                        <li><a className="link link-hover">Online Tutoring</a></li>
                        <li><a className="link link-hover">Course Materials</a></li>
                        <li><a className="link link-hover">Study Resources</a></li>
                        <li><a className="link link-hover">Interactive Learning</a></li>
                    </ul>
                </nav>
                <nav>
                    <h4 className="footer-title font-semibold mb-2">Company</h4>
                    <ul className="space-y-1">
                        <li><a className="link link-hover">About Us</a></li>
                        <li><a className="link-hover">Contact</a></li>
                        <li><a className="link-hover">Careers</a></li>
                        <li><a className="link-hover">Media Kit</a></li>
                    </ul>
                </nav>
                <nav>
                    <h4 className="footer-title font-semibold mb-2">Legal</h4>
                    <ul className="space-y-1">
                        <li><a className="link link-hover">Terms of Use</a></li>
                        <li><a className="link link-hover">Privacy Policy</a></li>
                        <li><a className="link link-hover">Cookie Policy</a></li>
                    </ul>
                </nav>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
                {/* Social Media Icons */}
                <a href="https://www.facebook.com/mdimranulhaqueee/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.675 0h-21.35C.597 0 0 .596 0 1.325v21.351C0 23.404.596 24 1.325 24h21.351C23.404 24 24 23.404 24 22.675V1.325C24 .596 23.404 0 22.675 0zm-11.9 24V13.325H8.475v-3.475h2.3V7.787c0-2.275 1.36-3.525 3.367-3.525.925 0 1.925.165 1.925.165v2.425h-1.081c-1.058 0-1.387.658-1.387 1.334v1.575h2.575l-.412 3.475h-2.163V24h-3.4z" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/md-imranul-haque/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57c-.885.392-1.83.654-2.825.775 1.012-.607 1.794-1.566 2.165-2.724-.949.563-2.003.975-3.127 1.197-.896-.956-2.171-1.554-3.592-1.554-2.719 0-4.927 2.208-4.927 4.916 0 .386.045.761.127 1.124-4.092-.205-7.72-2.164-10.148-5.144-.423.725-.666 1.564-.666 2.464 0 1.698.866 3.194 2.179 4.07-.803-.025-1.558-.246-2.219-.615v.061c0 2.382 1.693 4.375 3.935 4.832-.412.112-.846.171-1.293.171-.316 0-.623-.031-.923-.086.623 1.95 2.433 3.374 4.578 3.414-1.675 1.315-3.785 2.096-6.073 2.096-.394 0-.785-.023-1.172-.067 2.167 1.392 4.735 2.204 7.476 2.204 8.95 0 13.837-7.43 13.837-13.887 0-.211-.005-.423-.014-.634.951-.688 1.774-1.55 2.426-2.54z" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/md-imranul-haque/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.23 0h-20.46C.994 0 0 .995 0 2.23v19.54C0 23.005.995 24 2.23 24h20.54C23.006 24 24 23.005 24 21.77V2.23C24 .995 23.005 0 22.23 0zM7.188 20.452H4.21V9h2.978v11.452zm-1.49-13.283a1.7 1.7 0 1 1 .003-3.401 1.7 1.7 0 0 1-.003 3.401zM20.452 20.452h-2.978v-5.74c0-1.37-.025-3.143-1.913-3.143-1.914 0-2.21 1.49-2.21 3.028v5.855h-2.978V9h2.86v1.564h.04c.398-.75 1.372-1.548 2.83-1.548 3.029 0 3.583 1.998 3.583 4.588v6.848h-.003z" />
                    </svg>
                </a>
            </div>
            <div className="text-center mt-8 text-sm">
                © {new Date().getFullYear()} TutorMatch. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
