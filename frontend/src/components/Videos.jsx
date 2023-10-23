import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Videos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  console.log('test0: ', videos);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(2);

  useEffect(() => {
    try {
      getVideos();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const getVideos = async () => {
    const result = await axios.get('http://localhost:3002/api/videos');
    setVideos(result.data);
  };

  // const getVideoPage = async () => {
  //   const result = await axios.get(
  //     `http://localhost:3002/api/videos/videos?page=${page}&limit=${limit}`
  //   );
  //   setVideos(result.data);
  // };

  const editVideo = (videoId) => {
    navigate(`/videoEdit/${videoId}`);
  };

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3002/api/videos/delete/${videoId}`);
      getVideos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Video List</h1>

      <div className="content">
        {videos.map((videos) => (
          <div className="card" key={videos._id}>
            <div className="img">
              <img
                className="card-img"
                src={videos.url}
                alt={videos.videoName}
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">{videos.videoName}</h3>
              <div className="card-item">
                <p>stock: {videos.stock}</p>
                <p>stock: {videos.price}</p>
              </div>
              <div className="card-button">
                <button
                  onClick={() => editVideo(videos._id)}
                  className="btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVideo(videos._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
