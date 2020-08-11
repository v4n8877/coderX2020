require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const userRoute = require('./routes/user.route');
const booksRoute = require('./routes/books.route');
const transRoute = require('./routes/transactions.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
//API route
const userApiRoute = require('./api/routes/auth.route');
const transactionsAPIroute =  require('./api/routes/transaction.route');

const authMidleware = require('./midlewares/auth.midleware');
const sessionMidleware = require('./midlewares/session.midleware');

const app = express();
const port = process.evn.PORT || 3000;

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESION_SECRET));
app.use(cookieParser(process.env.CLOUDINARY_URL));
app.use(sessionMidleware);

// Route books
app.use('/books', booksRoute);

// Route users
app.use('/users', authMidleware.requireAuth, userRoute);

// Route transactions
app.use('/trans', authMidleware.requireAuth, transRoute);

//Route cart
app.use('/cart', cartRoute);

// Route auth
app.use('/auth', authRoute);

//Route api auth
app.use('/api/login', userApiRoute);

//Route api auth
app.use('/api/transactions', transactionsAPIroute);

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
