import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});














// Home.js: displays a banner and a list of data fetched from the API
// DataList.js: displays the data fetched from the API with layout and CSS styling
// Form.js: a form to input data for the POST endpoint with validation
// Navigation.js: uses React Router to navigate between different pages







// import React, { useEffect, useState } from 'react';

// const Home = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setData([

//       ]);
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       <h1>Banner</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;












