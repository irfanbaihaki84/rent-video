import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VideoDetailScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log('videoDetail: ', id);

  const [videoId, setVideoId] = useState(id);
  const [videoName, setVideoName] = useState('');
  const [videoSlug, setVideoSlug] = useState('');
  const [description, setDescription] = useState('');
  //   const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const editVideo = (videoId) => {
    navigate(`/videoEdit/${videoId}`);
  };

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3002/api/videos/delete/${videoId}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getVideoById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/videos/${id}`
        );
        setVideoId(data._id);
        // console.log('setVideoId: ', data._id);
        setVideoName(data.videoName);
        setVideoSlug(data.videoSlug);
        setDescription(data.description);
        // setImage(data.image);
        setUrl(data.url);
        setStock(data.stock);
        setPrice(data.price);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVideoById();
  }, [videoId]);

  return (
    <div className="container">
      <h1>Details Video</h1>
      <div className="content">
        <div className="card-fluid" key={id}>
          <div className="img">
            <img className="card-img-fluid" src={url} alt={videoName} />
          </div>
          <div className="card-body">
            <h3 className="card-title">{videoName}</h3>
            <h4 className="card-title">{videoId}</h4>
            <h4 className="card-title">{videoSlug}</h4>
            <div className="card-item">
              <p>Stock: {stock}</p>
              <p>Price: {price}</p>
              <p>Description: {description}.</p>
            </div>
            <div className="card-button">
              <button className="btn-warning" onClick={() => editVideo(id)}>
                Edit
              </button>
              <button className="btn-danger" onClick={() => deleteVideo(id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
