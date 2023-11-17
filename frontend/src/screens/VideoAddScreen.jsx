import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoAddScreen() {
  const navigate = useNavigate();
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

  const addHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('image', image);
    try {
      const { data } = await axios.post(
        'http://localhost:3002/api/videos/create',
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
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(data);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Add Video</h1>
      <div className="content">
        <form onSubmit={addHandler}>
          <h1 className="form-title">Add Video</h1>
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
              <option defaultValue="Action">Action</option>
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
              <option defaultValue="1.0">1.0</option>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
