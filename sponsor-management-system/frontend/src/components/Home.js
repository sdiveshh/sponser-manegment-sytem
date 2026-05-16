import React from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <img src="https://picsum.photos/2000/400" alt="Banner" className="img-fluid" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Navigation />
      </nav>
    </div>
  );
};

export default Home;



