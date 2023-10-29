// const { Video } = require('../models/videoModel.js');
import Video from '../models/videoModel.js';

class VideoController {
  static async getAllVideo(req, res) {
    try {
      const videos = await Video.findById();
      console.log('getAllVideo: ', videos);
      res.status(200).json(videos);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  static async getVideoId(req, res) {
    try {
      const video = await Video.findById(req.params.videoId);
      console.log('getVideoId: ', video);
      res.status(200).json(video);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = VideoController;
