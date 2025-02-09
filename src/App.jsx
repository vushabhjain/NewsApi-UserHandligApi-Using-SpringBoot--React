import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
;
import { FaSun, FaMoon } from "react-icons/fa"; // Icons for theme toggle
import "./App.css";
import TodoApp from "./components/TodoApp";
import NewsApi from "./components/Api/NewsApi";
import RippleCursor from "./components/RippleCursor ";
import ShowUsers from "./components/Api/ShowUsers";
import RegisterUser from "./components/Api/RegisterUser";
import EditUser from "./components/Api/EditUser";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for the theme stored in localStorage
    return localStorage.getItem("theme") === "dark";
  });

  // Apply the theme when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme"); // Apply dark theme
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme"); // Remove dark theme
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Handle search action
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setSearchTerm(e.target.value); // Fix typo from `vlaue` to `value`
    setSearchTerm("");
  };


  return (
    <>
      {/* Navbar with Theme Toggle */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} fixed-top`}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            UserApp
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
             
              <li className="nav-item">
                <Link to="/ToDo" className="nav-link" onClick={() => setMenuOpen(false)}>
                  To-Do List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/NewsApi" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Latest News
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/showUsers" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Show-Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registerUser" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Add User
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="d-flex ms-3" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country code (e.g., 'us', 'in')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ms-2">
                Search
              </button>
            </form>

            {/* Theme Toggle Button */}
            <button className="btn ms-3 theme-toggle-btn" onClick={toggleTheme}>
              {darkMode ? <FaSun size={20} color="yellow" /> : <FaMoon size={20} color="black" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 All Rights Reserved</p>
      </footer>

      {/* Routes */}
      <Routes>
      
        <Route path="/ToDo" element={<TodoApp />} />
        <Route path="/showUsers" element={<ShowUsers />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/updateUser/:username" element={<EditUser />} />
        <Route path="/newsApi" element={<NewsApi country1={searchTerm} />} />

      </Routes>
      <RippleCursor/>
    </>
  );
}

export default App;

