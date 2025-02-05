export const NavBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href="http://aux.messymatters.com/pgnames.html" target="_blank" rel="noopener noreferrer">Startup Names (pgraham, 2006)</a></li>
                        <li><a href="https://messymatters.com/nominology" target="_blank" rel="noopener noreferrer">Nominology (dreeves, 2011)</a></li>
                        <li><a href="https://paulgraham.com/name.html" target="_blank" rel="noopener noreferrer">Change your name (pgraham, 2015)</a></li>
                        <li><a href="https://domatron.com/" target="_blank" rel="noopener noreferrer">Domatron: (good for .com names)</a></li>
                        <li><a href="https://instantdomainsearch.com/" target="_blank" rel="noopener noreferrer">Instant Domain Search: (good for everything else)</a></li>

                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">delicious.domains</a>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    );
};