import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const url = process.env.MONGODB_URL;
const courseSchema = new mongoose.Schema({ isPublished: Boolean }, { strict: false });
const Course = mongoose.model('Course', courseSchema, 'courses');

(async () => {
  try {
    await mongoose.connect(url, { dbName: 'Agent' });
    const total = await Course.countDocuments();
    const published = await Course.countDocuments({ isPublished: true });
    const sample = await Course.find({ isPublished: true }).limit(5).lean();
    console.log(JSON.stringify({ total, published, sample }, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
