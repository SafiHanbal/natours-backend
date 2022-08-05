const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.NODE_ENV);

const app = require('./app');

const port = process.env.PORT || 8000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log('App running on port 8000!');
});
