import express from 'express';
import Video from '../models/videoModel.js';
import path from 'path';
import { createHash } from 'crypto';
// import data from '../data.js';

const videoRouter = express.Router();

// menampilkan seluruh data dari collection video
videoRouter.get('/', async (req, res) => {
  const videos = await Video.find({});
  res.send(videos);
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
  console.log('masuk POST');
  try {
    if (req.body.videoName === '') {
      return console.log('Video name must be filled!');
    }

    let videoImage = null;
    let nameImage = null;
    let videoUrl = null;

    if (req.body.image !== null) {
      videoImage = req.body.image;
      console.log('req.body: ', req.body);
      console.log('req.body.image: ', req.body.image);

      const extImage = path.extname(videoImage);
      console.log('extImage: ', extImage);

      nameImage = createHash('md5').update(videoImage).digest('hex') + extImage;
      // nameImage = videoImage.md5 + extImage;
      console.log('nameImage: ', nameImage);

      videoUrl = `${req.protocol}://${req.get('host')}/assets/${nameImage}`;
      console.log('videoUrl: ', videoUrl);

      // videoImage.mv(`./public/assets/${nameImage}`);
    }

    const newVideo = new Video({
      videoName: req.body.videoName,
      videoSlug: req.body.videoSlug,
      description: req.body.description,
      image: nameImage,
      url: videoUrl,
      stock: req.body.stock,
      price: req.body.price,
    });
    // console.log(newVideo.videoName);
    // console.log(newVideo.image);
    // console.log(newVideo.url);

    const video = await newVideo.save();
    res.send({
      // videoName: newVideo.videoName,
      videoName: video.videoName,
      // videoSlug: newVideo.videoSlug,
      videoSlug: video.videoSlug,
      // description: newVideo.description,
      description: video.description,
      // image: newVideo.image,
      image: video.image,
      // url: newVideo.url,
      url: video.url,
      // stock: newVideo.stock,
      stock: video.stock,
      // price: newVideo.price,
      price: video.price,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// update data pada collection video
videoRouter.put('/update/:id', async (req, res) => {
  let videoImage = null;
  let nameImage = null;
  let videoUrl = null;

  if (req.body.image !== null) {
    videoImage = req.body.image;
    console.log('req.body: ', req.body);
    console.log('req.body.image: ', req.body.image);

    const extImage = path.extname(videoImage);
    console.log('extImage: ', extImage);

    nameImage = createHash('md5').update(videoImage).digest('hex') + extImage;
    // nameImage = videoImage.md5 + extImage;
    console.log('nameImage: ', nameImage);

    videoUrl = `${req.protocol}://${req.get('host')}/assets/${nameImage}`;
    console.log('videoUrl: ', videoUrl);

    // videoImage.mv(`./public/assets/${nameImage}`);
  }

  const video = await Video.findById(req.params.id);
  if (video) {
    video.videoName = req.body.videoName || video.videoName;
    video.videoSlug = req.body.videoSlug || video.videoSlug;
    video.description = req.body.description || video.description;
    video.image = video.image || nameImage;
    video.url = video.url || videoUrl;
    video.stock = req.body.stock || video.stock;
    video.price = req.body.price || video.price;

    const updateVideo = await video.save();
    res.send({
      _id: updateVideo._id,
      videoName: updateVideo.videoName,
      videoSlug: updateVideo.videoSlug,
      description: updateVideo.description,
      videoImage: updateVideo.image,
      videoUrl: updateVideo.url,
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

// menampilkan data dengan cara pagination / perhalaman
videoRouter.get(`/videos`, async (req, res) => {
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

export default videoRouter;
