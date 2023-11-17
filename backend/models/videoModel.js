import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    videoName: { type: String, required: true },
    genre: { type: Array },
    production: {
      company: String,
      producer: String,
      year: Number,
    },
    description: { type: String },
    rating: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    image: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
