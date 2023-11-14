project rent video

#====CARA MENJALANKAN PROJECT=====#

buka terminal atau git bash pada desktop, lalu ketikan

git clone https://github.com/irfanbaihaki84/rent-video.git

masuk ke dalam folder rent-video/backend pada terminal

untuk menjalankan backend, pada terminal ketik peritah

npm start

npm install -g

buat file .env di folder rent-video/backend

touch .env

di dalam file .env masukan

PORT=3002

MONGODB_URI=mongodb://127.0.0.1:27017/rent

bukan aplikasi MongoDBCompass, buat conllection rent

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

#====CARA MENJALANKAN PROJECT=====#

#====AWAL BACKEND=====#

buat folder rent-video

buat folder backend dan masuk ke folder backend

npm init -y

npm i express mongoose dotenv --save

npm i nodemon --save-dev

buka file package.json dan tambahkan "type" dan "start":
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

buat file server.js dan tambahkan (di dalam folder backend):
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

buat file .env dan tambahkan (di dalam folder backend)
PORT=3002
MONGODB_URI=mongodb://127.0.0.1:27017/rent
#=========#

buat folder models di dalam folder backend

dalam folder models buat file videoModel.js dan tambahkan
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

buat file data.js dan tambahkan (di dalam folder backend)
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

dalam folder routes buat file videoRoutes.js dan tambahkan
import express from 'express';
import Video from '../models/videoModel.js';
import data from '../data.js';

const videoRouter = express.Router();

// menampilkan seluruh data collection video
videoRouter.get('/', async (req, res) => {
const videos = await Video.find({});
res.send(videos);
});

// membuat collection video di database rent
videoRouter.get('/seed', async (req, res) => {
await Video.deleteOne({});
const createdVideos = await Video.insertMany(data.videos);
res.send({ createdVideos });
});

// menyimpan data pada collection video
videoRouter.post('/create', async (req, res) => {
const newVideo = new Video({
videoName: req.params.videoName,
videoSlug: req.params.videoSlug,
stock: req.params.stock,
price: req.params.price,
});
const video = await newVideo.save();
res.send({
\_id: video.\_id,
videoName: video.videoName,
videoSlug: video.videoSlug,
stock: video.stock,
price: video.price,
});
});

// update data pada collection video
videoRouter.put('/update/:id', async (req, res) => {
const video = await Video.findById(req.params.id);
if (video) {
video.videoName = req.body.videoName || video.videoName;
video.videoSlug = req.body.videoSlug || video.videoSlug;
video.stock = req.body.stock || video.stock;
video.price = req.body.price || video.price;

    const updateVideo = await video.save();
    res.send({
      _id: updateVideo._id,
      videoName: updateVideo.videoName,
      videoSlug: updateVideo.videoSlug,
      stock: updateVideo.stock,
      price: updateVideo.price,
    });

} else {
res.status(400).send({ message: 'Video not found!' });
}
});

// delete data pada collection video
videoRouter.delete('/delete/:id', async (req, res) => {
const video = await videoRouter.findById(req.params.id);
if (video) {
await video.remove();
res.send({ message: 'Video deleted successfully' });
} else {
res.send({ message: 'Video not found!' });
}
});

export default videoRouter;
#=========#
