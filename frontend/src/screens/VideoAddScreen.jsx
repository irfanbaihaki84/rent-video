import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoAddScreen() {
  const navigate = useNavigate();
  const [videoName, setVideoName] = useState('');
  const [videoSlug, setVideoSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const addHandler = async (e) => {
    e.prventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3002/api/videos/create',
        {
          videoName,
          videoSlug,
          description,
          image,
          url,
          stock,
          price,
        }
      );
      console.log('data: ', data);
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
          <div className="form-group">
            <p className="form-label">URL</p>
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
            />
          </div>

          <div className="form-group">
            <p className="form-label">Stock</p>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <p className="form-label">Price</p>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
