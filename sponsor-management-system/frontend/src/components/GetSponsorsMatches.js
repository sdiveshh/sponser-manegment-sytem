import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetSponsorsMatches = () => {
  const [sponsorMatches, setSponsorMatches] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSponsorMatches();
  }, [year]);

  const fetchSponsorMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5254/api/Sponsor/sponsors-matches?year=${year}`);
      setSponsorMatches(response.data);
    } catch (err) {
      setError('Failed to fetch sponsor matches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/match-details')}>Match Details</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/sponsor-details')}>Sponsor Details</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/form')}>Form</button>
            </li>
          </ul>
        </div>
      </nav>

      <h2 className="text-center mb-4">Sponsor Matches for {year}</h2>
      <div className="mb-3">
        <label htmlFor="yearInput" className="form-label">Select Year:</label>
        <input
          id="yearInput"
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sponsor ID</th>
            <th scope="col">Sponsor Name</th>
            <th scope="col">Number of Matches</th>
          </tr>
        </thead>
        <tbody>
          {sponsorMatches.map((sponsor) => (
            <tr key={sponsor.sponsorId}>
              <td>{sponsor.sponsorId}</td>
              <td>{sponsor.sponsorName}</td>
              <td>{sponsor.numberOfMatches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetSponsorsMatches;