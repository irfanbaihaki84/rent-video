import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function VideoEditScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { videoId } = params;
  console.log('params0: ', videoId);

  const [videos, setVideos] = useState([]);
  console.log('videos1: ', videos);

  const [videoName, setVideoName] = useState('');
  const [genre, setGenre] = useState('');
  const [company, setCompany] = useState('');
  const [producer, setProducer] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  // const [url, setUrl] = useState('');

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3002/api/videos/update/${videoId}`,
        {
          videoName,
          genre,
          company,
          producer,
          year,
          description,
          rating,
          price,
          image,
          // url,
        }
      );
      console.log('data: ', data);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getVideoById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/videos/${videoId}`
        );
        setVideos(data);
        setVideoName(data.videoName);
        // console.log('videoName: ', data.videoName);
        setGenre(data.genre);
        setCompany(data.production.company);
        setProducer(data.production.producer);
        setYear(data.production.year);
        setDescription(data.description);
        setRating(data.rating);
        setPrice(data.price);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVideoById();
  }, [videoId]);

  return (
    <div className="container">
      <h1>Id {videoId}</h1>
      <div className="content" key={videoId}>
        <form className="formDisplay" onSubmit={editHandler}>
          <h1 className="form-title">Edit Video</h1>
          <div className="form-group">
            <p className="form-label">Video Name</p>
            <input
              type="text"
              className="form-control"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="Video Name"
              required
            />
          </div>
          <div className="form-group">
            <p className="form-label">Genre</p>
            {/* <input
              type="text"
              className="form-control"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre"
            /> */}
            <select
              name="genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option defaultValue={genre}>{genre}</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Anime">Anime</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horor">Horor</option>
              <option value="Reincarnation">Reincarnation</option>
              <option value="Romance">Romance</option>
              <option value="Series">Series</option>
              <option value="Sci-fy">Sci-fy</option>
              <option value="Real">Real</option>
            </select>
          </div>
          <div className="form-group">
            <p className="form-label">Company</p>
            <input
              type="text"
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Producer</p>
            <input
              type="text"
              className="form-control"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              placeholder="Producer"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Year</p>
            <input
              type="Number"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Description</p>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Rating</p>
            {/* <input
              type="number"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="0"
            /> */}
            <select
              name="rating"
              id="rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <option defaultValue={rating}>{rating}</option>
              <option value="1.0">1.0</option>
              <option value="2.0">2.0</option>
              <option value="3.0">3.0</option>
              <option value="4.0">4.0</option>
              <option value="5.0">5.0</option>
              <option value="6.0">6.0</option>
              <option value="7.0">7.0</option>
              <option value="8.0">8.0</option>
              <option value="9.0">9.0</option>
              <option value="9.5">9.5</option>
              <option value="10.0">10.0</option>
            </select>
          </div>
          <div className="form-group">
            <p className="form-label">Price Rp.</p>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Image</p>
            <input
              type="file"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image"
            />
          </div>
          {/* <div className="form-group">
            <p className="form-label">URL</p>
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
            />
          </div> */}

          <div className="form-group-btn">
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
