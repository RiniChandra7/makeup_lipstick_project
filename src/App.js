import './App.css';
import DupeFinder from './components/dupe-finder.component';
import Home from './components/home.component';
import Navbar from './components/navbar.component';
import Recommendations from './components/recommendations.component';
import SuggestDupes from './components/suggest-dupes.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="dupe-finder" element={<DupeFinder />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="suggest-dupes" element={<SuggestDupes />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
