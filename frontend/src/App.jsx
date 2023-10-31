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
          <a href="/" className="nav-bar-link">
            Home
          </a>
          <a href="/videoAdd" className="nav-bar-link">
            Add Video
          </a>
        </div>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/videoDetail/:id" element={<VideoDetailScreen />} />
          <Route path="/videoAdd" element={<VideoAddScreen />} />
          <Route path="/videoEdit/:videoId" element={<VideoEditScreen />} />
        </Routes>
        <footer>
          <p className="footer">Create by: Baihaki 2023</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
