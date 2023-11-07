import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Genre() {
  const [categories, setCategories] = useState([]);
  console.log('categories: ', categories);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  //   const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    try {
      getGenreVideo();
    } catch (error) {
      console.log(error.message);
    }
  }, [page, limit]);

  const getGenreVideo = async () => {
    const pageData = await axios.get(
      `http://localhost:3002/api/videos/pagin?page=${page}&limit=${limit}`
    );
    console.log('pageData: ', pageData.data);
    setCategories(pageData.data.category);
    setPage(pageData.data.page);
    setLimit(pageData.data.pageSize);
    // setPageCount(pageData.data.pages);
  };
  return (
    <div>
      {categories.map((category) => (
        <p key={category._id}>
          Genre: {category.genre1}, {category.genre1}
        </p>
      ))}
    </div>
  );
}
