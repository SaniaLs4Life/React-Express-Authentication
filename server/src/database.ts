import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://typescript-express:hakangenc1@cluster0-jfkh9.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('Database is connected.');
  })
  .catch(err => console.log(err));
