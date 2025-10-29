require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes'); // or './userRoutes' if you named it that
app.use('/api', userRoutes);

const PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error', err));

app.get('/', (req, res) => {
  res.send('PharmaLoop backend running');
});

// Use backticks `` for template string
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
