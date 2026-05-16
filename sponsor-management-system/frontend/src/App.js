import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GetMatchDetails from './components/GetMatchDetails';
import GetSponsorsDetails from './components/GetSponsorDetails';
import Form from './components/Form'; 
import GetSponsorsMatches from './components/GetSponsorsMatches';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/match-details" element={<GetMatchDetails />} />
        <Route path="/sponsor-details" element={<GetSponsorsDetails />} />
        <Route path="/form" element={<Form />} />
        <Route path="/sponsor-matches" element={<GetSponsorsMatches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;