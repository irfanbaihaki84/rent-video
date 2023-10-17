# rent-video

project crud tenteng website rent video

#====AWAL GITHUB=====#
cara remote / kendali dari jauh repository anda:
git remote set-url origin https://github.com/irfanbaihaki84/rent-video.git

cara clone / menyalin seluruh data pada repository anda:
git clone https://github.com/irfanbaihaki84/rent-video.git

masuk ke folder rent-video yang telah di cloned:
cd rent-video

git checkout main

melihat setatus data git:
git status

melihat semua perubahan:
git add .

memberi pasan pada data yang berubah:
git commit -m "my first commit"

upload data ke repository:
git push origin main
#====AKHIR GITHUB=====#

project rent video

#====AWAL BACKEND=====#
buat folder rent-video

#1. buat folder backend di dalam folder rent-video dan masuk ke folder backend

npm init -y

npm i express mongoose dotenv --save

npm i nodemon --save-dev

buka file package.json dan tambahkan "type" dan "start"
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

buat file server.js dan tambahkan (di dalam folder backend)
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

#====AKHIR BACKEND=====#

#====AWAL FRONTEND=====#
#2. buat folder frontend di dalam folder rent-video dan masuk ke folder frontend

npm create vite@latest . --template react

pilih react
pilih javascript

pastikan berada di dalam folder frontend
setelah di dalam folder frontend

npm install

buka file vite.config.js dan tambahkan code di bawah ini
untuk menentukan host dan port yang dipakai:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
server: {
host: 'localhost',
port: 4002,
},
});
#=========#

npm i axios react-router-dom

saya menjalankan aplikasi dalam mode developmen

npm run dev

rubah file App.jsx di dalam folder src
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
return (
<BrowserRouter>

<div>
<h1>Hello</h1>
</div>
<Routes>
<Route path="/" element={<HomeScreen />} />
</Routes>
</BrowserRouter>
);
}

export default App;
#=========#

buat folder screens di dalam folder src

buat file HomeScreen.jsx di dalam folder screens
import Videos from '../components/Videos';

export default function HomeScreen() {
return (

<div>
<h1>Home Screen</h1>
<Videos />
</div>
);
}
#=========#

buat folder components di dalam folder src

buat file Videos.jsx di dalma folder components
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Videos() {
const [videos, setVideos] = useState([]);

useEffect(() => {
try {
getVideos();
// console.log('test0: ', videos);
// console.log('test1: ', videos.length);
} catch (error) {
console.log(error.message);
}
}, []);

const getVideos = async () => {
const result = await axios.get('http://localhost:3002/api/videos');
setVideos(result.data);
};

return (

<div>
<h1>Video Detail</h1>
<button type="submit" className="btn-success">
Add
</button>
<table>
<thead>
<tr>
<th>ID</th>
<th>NAME</th>
<th>STOCK</th>
<th>PRICE</th>
<th>ACTION</th>
</tr>
</thead>
<tbody>
{videos.map((video, index) => (
<tr key={video._id}>
<td>{index + 1}</td>
<td>{video.videoName}</td>
<td>{video.stock}</td>
<td>{video.price}</td>
<td>
<button type="button" className="btn-warning">
Edit
</button>
<button type="button" className="btn-danger">
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}
#=========#

#====AKHIR FRONTEND=====#

#====AWAL GITHUB=====#
cara remote / kendali dari jauh repository anda:
git remote set-url origin https://github.com/irfanbaihaki84/rent-video.git

cara clone / menyalin seluruh data pada repository anda:
git clone https://github.com/irfanbaihaki84/rent-video.git

masuk ke folder rent-video yang telah di cloned:
cd rent-video

git checkout main

melihat setatus data git:
git status

melihat semua perubahan:
git add .

memberi pasan pada data yang berubah:
git commit -m "my first commit"

upload data ke repository:
git push origin main

#====AKHIR GITHUB=====#
