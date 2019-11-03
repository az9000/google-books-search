import React from "react";

function Nav() {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
        <a className="navbar-brand" href="/">
          Google Books
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/Books">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Saved">
                Saved
              </a>
            </li>
          </ul>
        </div>
      </nav>
    
  );
}

export default Nav;
