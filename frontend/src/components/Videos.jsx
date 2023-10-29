import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const fetcher = (url) => fetcher(url).then((res) => res.json());
// console.log('fetcher: ', fetcher);

export default function Videos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  console.log('test0: ', videos);
  console.log('video.length: ', videos.length);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    try {
      // getVideos();
      getVideoPage();

      // if (data) {
      //   data.pagination.pageCount(setPageCount);
      // }
    } catch (error) {
      console.log(error.message);
    }
  }, [page, limit]);

  // const getVideos = async () => {
  //   const result = await axios.get('http://localhost:3002/api/videos');
  //   setVideos(result.data);
  // };

  // const getVideoPage = async () => {
  //   const result = await axios.get(
  //     `http://localhost:3002/api/videos/videos?page=${page}&limit=${limit}`
  //   );
  //   setVideos(result.data);
  // };

  // let data = {};
  const getVideoPage = async () => {
    const pageData = await axios.get(
      `http://localhost:3002/api/videos/pagin?page=${page}&limit=${limit}`
    );
    console.log('pageData: ', pageData.data);
    setVideos(pageData.data.data);
    setPage(pageData.data.page);
    setLimit(pageData.data.pageSize);
    setPageCount(pageData.data.pages);
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
              <img className="card-img" src={video.url} alt={video.videoName} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{video.videoName}</h3>
              <div className="card-item">
                <p>Stock: {video.stock}</p>
                <p>Price: {video.price}</p>
              </div>
              <div className="card-button">
                <button
                  className="btn-warning"
                  onClick={() => editVideo(video._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger"
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
          className="btn-info"
          onClick={previousHandler}
          disabled={page === 1}
        >
          Previous
        </button>
        {page} / {pageCount}
        <button
          className="btn-info"
          onClick={nextHandler}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}
