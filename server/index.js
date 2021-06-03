const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const db = require('./models');

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const commentRouter = require('./routes/Comments');
app.use('/comments', commentRouter);

const userRouter = require('./routes/Users');
app.use('/auth', userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('🚀 connected on port 3001');
  });
})