import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import VideoAddScreen from './screens/VideoAddScreen';
import VideoEditScreen from './screens/VideoEditScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <a href="/">Home</a>
        <a href="/videoAdd">Add Video</a>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/videoAdd" element={<VideoAddScreen />} />
          <Route path="/videoEdit/:videoId" element={<VideoEditScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
