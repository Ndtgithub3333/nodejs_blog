const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override');
const handlebars = require('express-handlebars').engine;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connet to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
