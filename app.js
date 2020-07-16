const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const booksRoute = require('./routes/books.route');
const transRoute = require('./routes/transactions.route');
const authRoute = require('./routes/auth.route');
const authMidleware = require('./midlewares/auth.midleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Route books
app.use('/books', authMidleware.requireAuth, booksRoute);

// Route users
app.use('/users', authMidleware.requireAuth, userRoute);

// Route transactions
app.use('/trans', authMidleware.requireAuth, transRoute);

// Route auth
app.use('/auth', authRoute);

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
