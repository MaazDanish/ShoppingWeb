const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));    // to add css files

app.use( (req,res,next) => {
	User.findByPk(1).then( user =>{
		req.user = user;
		next();
	}).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
	// when we need to override a table with already existngtable - new table ko old se replace krna same name wali
	// .sync({force:true})
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({ name: 'maaz danish', email: 'dk55@gmail.com' });
		}
		return user;
	})
	.then(user => {
		console.log(user);
		app.listen(4000);
	})
	.catch(err => console.log(err));
