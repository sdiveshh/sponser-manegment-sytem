import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetMatchDetails = () => {
  const [matchDetails, setMatchDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5254/api/Sponsor/Match-Details')
      .then(response => {
        setMatchDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Match Details</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Match ID</th>
            <th scope="col">Location</th>
            <th scope="col">Total Payments</th>
          </tr>
        </thead>
        <tbody>
          {matchDetails.map((match, index) => (
            <tr key={index}>
              <td>{match.matchId}</td>
              <td>{match.location}</td>
              <td>{match.totalPayments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetMatchDetails;