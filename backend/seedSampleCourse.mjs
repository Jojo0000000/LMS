import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const url = process.env.MONGODB_URL;

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: String,
  password: String,
  photoUrl: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });
const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: Number,
  thumbnail: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: Boolean
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema, 'courses');

async function run() {
  await mongoose.connect(url, { dbName: 'Agent' });
  const educatorEmail = 'educator-sample@virtualcourses.local';

  let educator = await User.findOne({ email: educatorEmail });
  if (!educator) {
    educator = await User.create({
      name: 'Sample Educator',
      email: educatorEmail,
      role: 'educator',
      password: '',
      photoUrl: ''
    });
    console.log('Created sample educator:', educator.email);
  } else {
    console.log('Found existing sample educator:', educator.email);
  }

  const publishedCount = await Course.countDocuments({ isPublished: true });
  if (publishedCount === 0) {
    const sampleCourse = await Course.create({
      title: 'Intro to Virtual Courses',
      category: 'Web Development',
      description: 'A sample published course for your LMS application. Learn the basics of creating, publishing, and managing courses.',
      price: 999,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      creator: educator._id,
      isPublished: true
    });
    console.log('Created sample published course:', sampleCourse.title);
  } else {
    console.log('Published courses already exist:', publishedCount);
  }
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
