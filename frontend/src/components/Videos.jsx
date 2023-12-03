import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Genre from './Genre';

export default function Videos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  console.log('videos: ', videos);
  console.log('videos.length: ', videos.length);

  // const [category, setCategory] = useState([]);
  // console.log('category: ', category);

  // const categoryNew = new Map([[1, category]]);
  // console.log('categoryNew: ', categoryNew);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    try {
      // getVideos();
      getVideoPage();
    } catch (error) {
      console.log(error.message);
    }
  }, [page, limit]);

  // const getVideos = async () => {
  //   const result = await axios.get('http://localhost:3002/api/videos');
  //   setVideos(result.data);
  // };

  const getVideoPage = async () => {
    const pageData = await axios.get(
      `http://localhost:3002/api/videos/pagin?page=${page}&limit=${limit}&name=${name}`
    );
    console.log('pageData: ', pageData.data);
    setVideos(pageData.data.data);
    setPage(pageData.data.page);
    setLimit(pageData.data.pageSize);
    setPageCount(pageData.data.pages);
    // setCategory(pageData.data.category);
  };

  function previousHandler() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function nextHandler() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  const editVideo = (videoId) => {
    navigate(`/videoEdit/${videoId}`);
  };

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3002/api/videos/delete/${videoId}`);
      // getVideos();
      getVideoPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Video List</h1>
      <div className="content">
        {videos.map((video) => (
          <div className="card" key={video._id}>
            <div className="img">
              <a href={`/videoDetail/${video._id}`}>
                <img
                  className="card-img"
                  src={video.url}
                  alt={video.videoName}
                />
              </a>
            </div>
            <div className="card-body">
              <a href={`/videoDetail/${video._id}`}>
                <h3 className="card-title1">{video.videoName}</h3>
              </a>
              <div className="card-item">
                <p>Rating: {video.rating},stars</p>
                <p>Genre: {video.genre}</p>
                <p>IDR. {video.price}</p>
                <p>Company: {video.production.company}</p>
                {/* <Genre /> */}
              </div>
              <div className="card-button">
                <button
                  className="btn btn-warning"
                  onClick={() => editVideo(video._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteVideo(video._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        Limit:
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <br />
        <button
          className="btn btn-info"
          onClick={previousHandler}
          disabled={page === 1}
        >
          Previous
        </button>
        {page} / {pageCount}
        <button
          className="btn btn-info"
          onClick={nextHandler}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}
