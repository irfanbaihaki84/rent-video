project rent video

#====AWAL CARA MENJALANKAN PROJECT=====#

buka terminal atau git bash pada desktop, lalu ketikan

git clone https://github.com/irfanbaihaki84/rent-video.git

masuk ke dalam folder rent-video/backend pada terminal

untuk menjalankan backend, pada terminal ketik peritah

npm start

npm install -g

buat file .env di folder rent-video/backend

touch .env

di dalam file .env ketikan

PORT=3002

MONGODB_URI=mongodb://127.0.0.1:27017/rent

bukan aplikasi MongoDBCompass, buat collection rent

masuk ke dalam folder rent-video/backend/routes file videoRoutes.jsx

untuk mengupload data ke dalam collection

aktifkan komentar // import data from '../data.js';

untuk membuat collection pada mongodb jalankan

// membuat collection video di database rent

videoRouter.get('/seed', async (req, res) => {

// buka browser tulis http://localhost:3002/api/seed dan tekan enter untuk mengesekusi

await Video.deleteOne({});

const createdVideos = await Video.insertMany(data.videos);

res.send({ createdVideos });

});

#====AKHIR CARA MENJALANKAN PROJECT=====#

#====AWAL BACKEND=====#

buat folder rent-video

buat folder backend dan masuk ke folder backend

npm init -y

npm i express mongoose dotenv --save

npm i nodemon --save-dev

buka file package.json dan ketikan "type" dan "start":

"name": "backend",

=>"type": "module",<=

"version": "1.0.0",

"description": "",

"main": "index.js",

"scripts": {

=>"start": "nodemon server.js",<=

"test": "echo \"Error: no test specified\" && exit 1"

},

#=========#

buat file server.js dan ketikan (di dalam folder backend):

import express from 'express';

import dotenv from 'dotenv';

import mongoose from 'mongoose';

import videoRouter from './routes/videoRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
console.log('connected to db');
})
.catch((error) => {
console.log(error.message);
});

const app = express();
app.use(express.json());

app.use('/api/videos', videoRouter);

const port = process.env.PORT;
app.listen(port, () => {
console.log(`server at http://localhost:${port}`);
});

#=========#

buat file .env dan ketikan (di dalam folder backend)

PORT=3002

MONGODB_URI=mongodb://127.0.0.1:27017/rent

#=========#

buat folder models di dalam folder backend

dalam folder models buat file videoModel.js dan ketikan

import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(

{

videoName: { type: String, required: true },

videoSlug: { type: String, required: true, unique: true },

description: { type: String, required: true },

stock: { type: Number, required: true },

price: { type: Number, required: true },

},

{
timestamps: true,
}

);

const Video = mongoose.model('Video', videoSchema);

export default Video;

#=========#

buat file data.js dan ketikan (di dalam folder backend)

const data = {

videos: [

{
videoName: 'videoSatu',
videoSlug: 'video-satu',
description: 'film aksi satu',
stock: 1,
price: 25000,
},

{
videoName: 'videoDua',
videoSlug: 'video-dua',
description: 'film aksi dua',
stock: 2,
price: 26000,
},

{
videoName: 'videoTiga',
videoSlug: 'video-tiga',
description: 'film aksi tiga',
stock: 3,
price: 27000,
},

{
videoName: 'videoEmpat',
videoSlug: 'video-empat',
description: 'film aksi empat',
stock: 4,
price: 28000,
},

{
videoName: 'videoLima',
videoSlug: 'video-lima',
description: 'film aksi lima',
stock: 5,
price: 29000,
},

{
videoName: 'videoEnam',
videoSlug: 'video-enam',
description: 'film aksi enam',
stock: 6,
price: 30000,
},

{
videoName: 'videoTujuh',
videoSlug: 'video-tujuh',
description: 'film aksi tujuh',
stock: 7,
price: 31000,
},

{
videoName: 'videoDelapan',
videoSlug: 'video-delapan',
description: 'film aksi delapan',
stock: 8,
price: 32000,
},

{
videoName: 'videoSembilan',
videoSlug: 'video-sembilan',
description: 'film aksi sembilan',
stock: 9,
price: 33000,
},

{
videoName: 'videoSepuluh',
videoSlug: 'video-sepuluh',
description: 'film aksi sepuluh',
stock: 10,
price: 34000,
},

],

};

export default data;

#=========#

buat folder routes di dalam folder backend

dalam folder routes buat file videoRoutes.js dan ketikan

import express from 'express';

import Video from '../models/videoModel.js';

import path from 'path';

import { createHash } from 'crypto';

// import data from '../data.js';

const videoRouter = express.Router();

// menampilkan seluruh data dari collection video

videoRouter.get('/', async (req, res) => {
const videos = await Video.find();
res.send(videos);
});

// membuat collection video di database rent

videoRouter.get('/seed', async (req, res) => {
// buka browser tulis http://localhost:3002/api/seed dan tekan enter untuk mengesekusi
// await Video.deleteOne({});
// const createdVideos = await Video.insertMany(data.videos);
// res.send({ createdVideos });
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
      category: {
        genre1: req.body.genre1,
        genre2: req.body.genre2,
      },
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
      category: video.category,
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
video.category.genre1 = req.body.genre1;
video.category.genre2 = req.body.genre2;

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
      category: updateVideo.category,
    });

} else {
res.status(400).send({ message: 'Video not found!' });
}
});

// delete data pada collection video

videoRouter.delete('/delete/:id', async (req, res) => {
const video = await Video.findById({ \_id: req.params.id });
if (video) {
// await video.remove();
await video.deleteOne();
res.send({ message: 'Video deleted successfully' });
} else {
res.send({ message: 'Video not found!' });
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

    const category = await Video.find({}, { category: 1 })
      .skip(skip)
      .limit(pageSize);
    console.log('category :', category);

    const hasil = query;
    // console.log('hasil: ', hasil);

    res.status(200).json({
      status: 'success',
      count: hasil.length,
      page,
      pages,
      pageSize,
      category,
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

videoRouter.get('/categories', async (req, res) => {
try {
// untuk menampung suluruh query psrams di sini
let result = await Video.find({}, { category: 1 });

    const hasil = result;
    console.log('category.hasil: ', hasil);

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
const videos = await Video.findById(req.params.videoId);
res.send(videos);
});

export default videoRouter;

#=========#
