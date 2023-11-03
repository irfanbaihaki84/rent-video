import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    videoName: { type: String },
    videoSlug: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
    url: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    category: {
      genre1: String,
      genre2: String,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
