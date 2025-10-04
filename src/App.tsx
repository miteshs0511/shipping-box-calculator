import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoxProvider } from './context/BoxContext';
import NavbarContainer from './components/Navbar/NavbarContainer';
import AddBox from './pages/AddBox';
import BoxList from './pages/BoxList';

function App() {
  return (
    <Router>
      <BoxProvider>
        <div className="min-h-screen bg-neutral">
          <NavbarContainer />
          <Routes>
            <Route path="/" element={<AddBox />} />
            <Route path="/box-list" element={<BoxList />} />
          </Routes>
        </div>
      </BoxProvider>
    </Router>
  );
}

export default App;
