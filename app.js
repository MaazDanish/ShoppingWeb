const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//   this is for testing purpose

// db.execute("SELECT * FROM products")
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err));
// .then(data => console.log(data[0],data[1],data[2]))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


sequelize.sync().then(data => {
	console.log(data)
	app.listen(4000);
})
	.catch(err => console.log(err));
