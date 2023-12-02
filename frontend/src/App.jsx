import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import VideoAddScreen from './screens/VideoAddScreen';
import VideoEditScreen from './screens/VideoEditScreen';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />

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
