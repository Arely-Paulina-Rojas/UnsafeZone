const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const path = require('path');
var cookieParser = require('cookie-parser');
const consolidate = require('consolidate');
var indexRouter = require('./routes/index');

const app = express()

app.use(cors());

app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Exportar rutas
app.use('/', indexRouter);
app.use("/api/users", require('./routes/users.routes'))
app.use("/api/places", require('./routes/places.routes'))
app.use("/api/reviews", require('./routes/reviews.routes'))


module.exports = app;
