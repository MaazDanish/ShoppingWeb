const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./Controller/404');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // to add css

app.use('/admin', adminRoute);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);
