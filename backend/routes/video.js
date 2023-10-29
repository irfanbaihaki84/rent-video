// const videoRoute = require('express').Router();
const { VideoController } = require('../controllers/index.js');
import express from 'express';
// import VideoController from '../controllers/index.js';

const videoRoute = express.Router();

videoRoute.get('/', VideoController.getAllVideo);
videoRoute.get('/:videoId', VideoController.getVideoId);

module.exports = videoRoute;
