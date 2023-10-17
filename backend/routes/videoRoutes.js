import express from 'express';
import Video from '../models/videoModel.js';
// import data from '../data.js';

const videoRouter = express.Router();

// menampilkan seluruh data dari collection video
videoRouter.get('/', async (req, res) => {
  const videos = await Video.find({});
  res.send(videos);
});

// menampilkan data dengan cara pagination / perhalaman
videoRouter.get('/videos', async (req, res) => {
  // current page
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  // const { page = 1, limit = 3 } = req.query;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let result = {};

    const videos = await Video.find();
    console.log('videos.length: ', videos.length);

    if (endIndex < videos.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex < 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result = videos.slice(startIndex, endIndex);
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

// menampilkan data dari id yang di cari
videoRouter.get('/:videoId', async (req, res) => {
  const videos = await Video.findById(req.params.videoId);
  res.send(videos);
});

// membuat collection video di database rent
videoRouter.get('/seed', async (req, res) => {
  // buka browser tulis http://localhost:3002/api/seed dan tekan enter untuk mengesekusi
  //   await Video.deleteOne({});
  //   const createdVideos = await Video.insertMany(data.videos);
  //   res.send({ createdVideos });
});

// menyimpan data pada collection video
videoRouter.post('/create', async (req, res) => {
  let test = [req.body.videoName];
  console.log('videoName: ', test);

  const newVideo = new Video({
    videoName: req.body.videoName,
    videoSlug: req.body.videoSlug,
    description: req.body.description,
    image: req.body.image,
    url: req.body.url,
    stock: req.body.stock,
    price: req.body.price,
  });
  console.log('newVideo: ', newVideo);
  console.log('videoName: ', newVideo.videoName);

  // const video = await newVideo.save();
  // res.send({
  //   _id: video._id,
  //   videoName: video.videoName,
  //   videoSlug: video.videoSlug,
  //   description: video.description,
  //   image: video.image,
  //   url: video.url,
  //   stock: video.stock,
  //   price: video.price,
  // });
  // res.send(newVideo);

  // console.log(error.message);
});

// update data pada collection video
videoRouter.put('/update/:id', async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    video.videoName = req.body.videoName || video.videoName;
    video.videoSlug = req.body.videoSlug || video.videoSlug;
    video.description = req.body.description || video.description;
    video.videoImage = req.body.videoImage || video.videoImage;
    video.videoUrl = req.body.videoUrl || video.videoUrl;
    video.stock = req.body.stock || video.stock;
    video.price = req.body.price || video.price;

    const updateVideo = await video.save();
    res.send({
      _id: updateVideo._id,
      videoName: updateVideo.videoName,
      videoSlug: updateVideo.videoSlug,
      description: updateVideo.description,
      videoImage: updateVideo.videoImage,
      videoUrl: updateVideo.videoUrl,
      stock: updateVideo.stock,
      price: updateVideo.price,
    });
  } else {
    res.status(400).send({ message: 'Video not found!' });
  }
});

// delete data pada collection video
videoRouter.delete('/delete/:id', async (req, res) => {
  const video = await Video.findById({ _id: req.params.id });
  if (video) {
    // await video.remove();
    await video.deleteOne();
    res.send({ message: 'Video deleted successfully' });
  } else {
    res.send({ message: 'Video not found!' });
  }
});

export default videoRouter;
