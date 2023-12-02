import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Navigation() {
  const [genres, setGenres] = useState([]);

  const getGenreVideo = async () => {
    const hasil = await axios.get('http://localhost:3002/api/videos/genres');
    console.log('genres: ', hasil.data);
    setGenres(hasil.data);
  };

  useEffect(() => {
    try {
      getGenreVideo();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div className="container">
      <div className="nav-bar">
        <div className="nav-item">
          <h1 className="nav-bar-link">
            <a href="/" className="nav-bar-link">
              Vidios.com
            </a>
          </h1>
          <a href="/" className="nav-bar-link">
            Home
          </a>
          <a href="/videoAdd" className="nav-bar-link">
            Add Video
          </a>

          <div className="dropdown">
            <button className="dropdown-button">Genre</button>
            {/* <a className="dropdown-button" href="#">Categories</a> */}
            <div className="dropdown-group formation-grid">
              <div className="dropdown-menu">
                {/* {genres.map((gen) => ( */}
                <div className="dropdown-heading">index</div>
                <div className="dropdown-links">Action</div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
