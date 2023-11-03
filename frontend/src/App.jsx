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
            <ul>
              <li>
                <p className="dropdown-title">Category</p>
                <ul className="dropdown">
                  <li>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      HTML
                    </a>
                  </li>
                  <li>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      CSS
                    </a>
                  </li>
                  <li>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      JavaScript
                    </a>
                  </li>
                  <li>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      NodeJS
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
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
