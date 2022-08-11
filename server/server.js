const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require('./routes/user.router');
// Get all cart items from a specific user where ordered = false
const guppyRouter = require('./routes/guppy.router');
// Get all public designs
const flouderRouter = require("./routes/flounder.router");
// Get all cart items where fulfilled = false and ordered = true
const catfishRouter = require('./routes/catfish.router');
// Get all designs made by a specific user
const carpRouter = require('./routes/carp.router');
// Update or Get a specific design
const anglerfishRouter = require('./routes/anglerfish.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */

app.use('/api/user', userRouter);
app.use("/api/flouder", flouderRouter);
app.use('/api/guppy', guppyRouter );
app.use('/api/catfish', catfishRouter);
app.use('/api/carp', carpRouter);
app.use('/api/anglerfish');

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
