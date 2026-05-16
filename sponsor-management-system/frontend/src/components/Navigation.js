import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="navbar-nav">
       <li className="nav-item">
        <Link to="/home" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/match-details" className="nav-link">Match Details</Link>
      </li>
      <li className="nav-item">
        <Link to="/sponsor-details" className="nav-link">Sponsor Details</Link>
      </li>
     
      <li className="nav-item">
        <Link to="/form" className="nav-link">Form</Link>
      </li>
      <li className="nav-item">
        <Link to="/sponsor-matches" className="nav-link">Sponsor Matches</Link>
      </li>
    </ul>
  );
};

export default Navigation;