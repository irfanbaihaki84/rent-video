import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import VideoAddScreen from './screens/VideoAddScreen';
import VideoEditScreen from './screens/VideoEditScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="nav-bar">
          <div className="nav-item">
            <h1 className="nav-bar-link">Vidios.com</h1>
            <a href="/" className="nav-bar-link">
              Home
            </a>
            <a href="/videoAdd" className="nav-bar-link">
              Add Video
            </a>

            <div className="dropdown">
              <a href="">Categories</a>
              <div className="dropdown-group">
                <div className="dropdown-menu">
                  <div className="dropdown-heading">Fiksi</div>
                  <div className="dropdown-links">
                    <a href="">Call of Duty</a>
                    <a href="">X-Man</a>
                    <a href="">Beautyful Mind</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/videoDetail/:id" element={<VideoDetailScreen />} />
          <Route path="/videoAdd" element={<VideoAddScreen />} />
          <Route path="/videoEdit/:videoId" element={<VideoEditScreen />} />
        </Routes>
        <footer>
          <p className="footer">
            Create by:{' '}
            <a href="https://github.com/irfanbaihaki84/rent-video"> Baihaki </a>
            2023
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
