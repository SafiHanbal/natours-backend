const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err.message));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
const importDataToDB = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteDataFromDB = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importDataToDB();
}
if (process.argv[2] === '--delete') {
  deleteDataFromDB();
}
