import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetSponsorsDetails = () => {
  const [sponsorDetails, setSponsorDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5254/api/Sponsor/Sponsor-Details')
      .then(response => {
        console.log('Response:', response);
        setSponsorDetails(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response) {
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error Message:', error.message);
        } else {
          console.error('Error:', error.message);
        }
        console.log('Config:', error.config);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Sponsor Details</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sponsor ID</th>
            <th scope="col">Sponsor Name</th>
            <th scope="col">Total Payments</th>
            <th scope="col">Number of Payments</th>
            <th scope="col">Latest Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {sponsorDetails.map((sponsor, index) => (
            <tr key={index}>
              <td>{sponsor.sponsorId}</td>
              <td>{sponsor.sponsorName}</td>
              <td>{sponsor.totalPayments}</td>
              <td>{sponsor.numberOfPayments}</td>
              <td>{sponsor.latestPaymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetSponsorsDetails;