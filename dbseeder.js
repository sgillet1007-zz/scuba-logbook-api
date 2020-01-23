const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({
  path: './config/config.env'
});

const User = require('./models/User');
const Dive = require('./models/Dive');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const dives = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/dives.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users);
    console.log('Users imported.'.green.inverse);
    await Dive.create(dives);
    console.log('Dives imported.'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Import error - ${err}`);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('User data deleted'.red.inverse);
    await Dive.deleteMany();
    console.log('Dive data deleted'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`Delete error - ${err}`);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
