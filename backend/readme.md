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
