import express from 'express';
import imagesRoute from './src/routes/images';

const app = express();

app.use('/api/images', imagesRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});


if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

export default app;
