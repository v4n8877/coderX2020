const express = require("express");
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');
const booksRoute = require('./routes/books.route');
const transRoute = require('./routes/transactions.route');

const app = express();
const port = 3000

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Route books
app.use('/books', booksRoute);

// Route users
app.use('/users', userRoute);

// Route transactions
app.use('/trans', transRoute);

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
