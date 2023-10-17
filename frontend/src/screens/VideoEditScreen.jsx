import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function VideoEditScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { videoId } = params;
  //   console.log('params0: ', videoId);

  const [videos, setVideos] = useState([]);
  const [id, setId] = useState();
  const [videoName, setVideoName] = useState('');
  const [videoSlug, setVideoSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    getVideoById();
    setId(videos._id);
    setVideoName(videos.videoName);
    setVideoSlug(videos.videoSlug);
    setDescription(videos.description);
    setStock(videos.stock);
    setPrice(videos.price);
  }, [videoId]);

  const getVideoById = async () => {
    const result = await axios.get(
      `http://localhost:3002/api/videos/${videoId}`
    );
    setVideos(result.data);
  };

  const editHandler = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3002/api/videos/update/${id}`,
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
      <h1>Video Edit {id}</h1>
      <div className="content">
        <form onSubmit={editHandler}>
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
