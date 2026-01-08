// Core module
const path = require('path');

// External modules
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

// Local modules
const router = require('./routes/router');
const rootDir = require('./utils/pathUtil');
const ErrorController = require('./controllers/error');

// App init
const app = express();

// MongoDB URL
const DB_PATH =
  "mongodb+srv://hoot:hoot@completecoding.ktjkmuy.mongodb.net/Rojgar?retryWrites=true&w=majority&appName=CompleteCoding";

// View engine (EJS)
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session store
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions',
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Routes
app.use(router);

app.use(ErrorController.pageNotFound);
// Server
const PORT = 3002;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Error while connecting to MongoDB', err);
  });
