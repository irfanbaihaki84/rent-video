import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoAddScreen() {
  const navigate = useNavigate();
  const [videoName, setVideoName] = useState('');
  const [videoSlug, setVideoSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  // const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');

  const addHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('image', image);
    try {
      const { data } = await axios.post(
        'http://localhost:3002/api/videos/create',
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
              <option defaultValue="Fiksi">Fiksi</option>
              <option value="Fakta">Fakta</option>
              <option value="Series">Series</option>
              <option value="Anime">Anime</option>
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
              <option defaultValue="Aksi">Aksi</option>
              <option value="Drama">Drama</option>
              <option value="Komedi">Komedi</option>
              <option value="Percintaan">Percintaan</option>
              <option value="Isekai">Isekai</option>
              <option value="Fiksi">Fiksi</option>
              <option value="Fakta">Fakta</option>
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
            <button type="submit" className="btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
