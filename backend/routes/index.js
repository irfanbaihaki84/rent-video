// const { Router } = require('express');
// const route = Router();
import express from 'express';

const mainEndPoint = '/api';

const route = express.Router();

route.get(`${mainEndPoint}`, (req, res) => {
  res.status(200).json({ message: 'API response successfully.' });
});

const videoRoutes = require('./video.js');
// import videoRoutes from './video.js';
route.use(`${mainEndPoint}/videos`, videoRoutes);

// module.exports = route;
export default route;
