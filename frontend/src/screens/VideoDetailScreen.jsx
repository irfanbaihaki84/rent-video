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
  const [genre, setGenre] = useState('');
  const [company, setCompany] = useState('');
  const [producer, setProducer] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  //   const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

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
        console.log('data: ', data.production);
        setVideoName(data.videoName);
        setGenre(data.genre);
        setCompany(data.production.company);
        setProducer(data.production.producer);
        setYear(data.production.year);
        setDescription(data.description);
        setRating(data.rating);
        setPrice(data.price);
        // setImage(data.image);
        setUrl(data.url);
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
            <h3 className="card-title1">{videoName}</h3>
            <h4 className="card-title2">{videoId}</h4>
            {/* <h4 className="card-title2">{videoSlug}</h4> */}
            <div className="card-item">
              <p>Genre: {genre}</p>
              <p>Rating: {rating},stars</p>
              <p>Price: Rp.{price}</p>
              <p>Company: {company}</p>
              <p>Producer: {producer}</p>
              <p>Year: {year}</p>
              <p>Description: {description}.</p>
            </div>
            <div className="card-button">
              <button className="btn btn-warning" onClick={() => editVideo(id)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteVideo(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
