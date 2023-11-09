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
  const [videoSlug, setVideoSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  // const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3002/api/videos/update/${videoId}`,
        {
          videoName,
          videoSlug,
          description,
          image,
          // url,
          stock,
          price,
          genre1,
          genre2,
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
        setVideoSlug(data.videoSlug);
        setDescription(data.description);
        setStock(data.stock);
        setPrice(data.price);
        setGenre1(data.category.genre1);
        setGenre2(data.category.genre2);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVideoById();
  }, [videoId]);

  return (
    <div className="container">
      <h1>Id {videoId}</h1>
      <div className="content">
        <form onSubmit={editHandler}>
          <h1 className="form-title">Edit Video</h1>
          <div className="form-group">
            <p className="form-label">Video Name</p>
            <input
              type="text"
              className="form-control"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="Video Name"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Video Slug</p>
            <input
              type="text"
              className="form-control"
              value={videoSlug}
              onChange={(e) => setVideoSlug(e.target.value)}
              placeholder="Video Slug"
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
              disabled
            />
          </div> */}
          <div className="form-group">
            <p className="form-label">Genre 1</p>
            {/* <input
              type="text"
              className="form-control"
              value={genre1}
              onChange={(e) => setGenre1(e.target.value)}
              placeholder="Genre 1"
            /> */}
            <select
              name="genre1"
              id="genre1"
              onChange={(e) => setGenre1(e.target.value)}
            >
              <option defaultValue={genre1}>{genre1}</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Anime">Anime</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horor">Horor</option>
              <option value="Reincarnation">Reincarnation</option>
              <option value="Romance">Romance</option>
              <option value="Series">Series</option>
              <option value="Fiction">Fiction</option>
              <option value="Real">Real</option>
            </select>
          </div>
          <div className="form-group">
            <p className="form-label">Genre 2</p>
            {/* <input
              type="text"
              className="form-control"
              value={genre2}
              onChange={(e) => setGenre2(e.target.value)}
              placeholder="Genre 2"
            /> */}
            <select
              name="genre2"
              id="genre2"
              onChange={(e) => setGenre2(e.target.value)}
            >
              <option defaultValue={genre2}>{genre2}</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Anime">Anime</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horor">Horor</option>
              <option value="Reincarnation">Reincarnation</option>
              <option value="Romance">Romance</option>
              <option value="Series">Series</option>
              <option value="Fiction">Fiction</option>
              <option value="Real">Real</option>
            </select>
          </div>

          <div className="form-group">
            <p className="form-label">Stock ,pcs</p>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
            />
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
