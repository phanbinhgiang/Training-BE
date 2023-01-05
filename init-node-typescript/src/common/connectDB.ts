import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const connectDatabase = () => {
  mongoose.Promise = bluebird;
  mongoose.set('strictQuery', true);
  mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`).then(() => {
    console.log('Coin98 Database connection created');
  });
};

export default connectDatabase;
