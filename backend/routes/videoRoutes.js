import express from 'express';
import Video from '../models/videoModel.js';
import path from 'path';
import { createHash } from 'crypto';
import data from '../data.js';

const videoRouter = express.Router();

// menampilkan seluruh data dari collection video
videoRouter.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// membuat collection video di database rent
videoRouter.get('/seed', async (req, res) => {
  // buka browser tulis http://localhost:3002/api/seed dan tekan enter untuk mengesekusi
  // await Video.deleteOne({});
  const createdVideos = await Video.insertMany(data.videos);
  res.send({ createdVideos });
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
      genre: req.body.genre,
      production: {
        company: req.body.company,
        producer: req.body.producer,
        year: req.body.year,
      },
      description: req.body.description,
      rating: req.body.rating,
      price: req.body.price,
      image: nameImage,
      url: videoUrl,
    });
    // console.log(newVideo.videoName);
    // console.log(newVideo.image);
    // console.log(newVideo.url);

    const video = await newVideo.save();
    res.send({
      videoName: video.videoName,
      genre: video.genre,
      production: video.production,
      description: video.description,
      rating: video.rating,
      price: video.price,
      image: video.image,
      url: video.url,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(401).send(error);
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
    video.genre = req.body.genre || video.genre;
    video.production.company = req.body.company || video.production.company;
    video.production.producer = req.body.producer || video.production.producer;
    video.production.year = req.body.year || video.production.year;
    video.description = req.body.description || video.description;
    video.rating = req.body.rating || video.rating;
    video.price = req.body.price || video.price;
    video.image = video.image || nameImage;
    video.url = video.url || videoUrl;

    const updateVideo = await video.save();
    res.send({
      _id: updateVideo._id,
      videoName: updateVideo.videoName,
      genre: updateVideo.genre,
      production: updateVideo.production,
      description: updateVideo.description,
      rating: updateVideo.rating,
      price: updateVideo.price,
      videoImage: updateVideo.image,
      videoUrl: updateVideo.url,
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
    res.status(200).send({ message: 'Video deleted successfully' });
  } else {
    res.status(404).send({ message: 'Video not found!' });
  }
});

// menampilkan data dengan cara pagination / perhalaman
videoRouter.get('/pagin', async (req, res) => {
  // console.log('masuk PAGIN');
  try {
    const page = parseInt(req.query.page) || 1;
    // console.log('page: ', page);

    const pageSize = parseInt(req.query.limit) || 3;
    // console.log('pageSize: ', pageSize);

    const skip = (page - 1) * pageSize;
    // console.log('skip: ', skip);

    // const total = await Video.estimatedDocumentCount();
    const total = await Video.countDocuments();
    // console.log('total: ', total);

    const pages = Math.ceil(total / pageSize);
    // console.log('pages: ', pages);

    // untuk menampung suluruh query psrams di sini
    let query = await Video.find().skip(skip).limit(pageSize);

    const production = await Video.find({}, { production: 1 })
      .skip(skip)
      .limit(pageSize);
    // console.log('production :', production);

    const hasil = query;
    // console.log('hasil: ', hasil);

    res.status(200).json({
      status: 'success',
      count: hasil.length,
      page,
      pages,
      pageSize,
      production,
      data: hasil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// menampilkan data berdasar category
videoRouter.get('/genres', async (req, res) => {
  try {
    // untuk menampung suluruh query params di sini
    // let result = await Video.find({ 'category.genre2': 'Comedy' });
    // let result = await Video.find({}, { category: 1 });

    // tampilkan data dengan genre1 dgn nilai Action dari category
    // dan urutkan descending dari nilai price
    // let result = await Video.aggregate([
    //   { $match: { 'category.genre1': 'Action' } },
    //   {
    //     $project: {
    //       name: '$videoName',
    //       stock: '$stock',
    //       price: '$price',
    //     },
    //   },
    //   { $sort: { price: -1 } },
    // ]);

    // menampilkan data yg sama
    let result = await Video.find().distinct('genre');

    const hasil = result;
    console.log('genre.hasil: ', hasil);

    res.status(200).json({
      status: 'success',
      count: hasil.length,
      data: hasil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// menampilkan data dari id yang di cari
videoRouter.get('/:videoId', async (req, res) => {
  try {
    const videos = await Video.findById(req.params.videoId);
    res.status(200).send(videos);
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

export default videoRouter;
