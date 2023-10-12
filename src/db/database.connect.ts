import mongoose from 'mongoose';

export const databaseConnect = () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbName = 'Hum';
  const uri = `mongodb+srv://${user}:${password}@hum.sbttlvt.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
