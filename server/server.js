const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
// Get all cart items from a specific user where ordered = false
const guppyRouter = require("./routes/guppy.router");
// Get all public designs
const flounderRouter = require("./routes/flounder.router");
// Get all cart items where fulfilled = false and ordered = true
const catfishRouter = require("./routes/catfish.router");
// Get all designs made by a specific user
const carpRouter = require('./routes/carp.router');
// Add a design
const bluegillRouter = require('./routes/bluegill.router');
// Update cart_item to be fulfilled/unfulfilled
// Get all cart items where fulfilled = true and ordered = true
const swordfishRouter = require('./routes/swordfish.router');
// Delete a design and its associated cart_item rows
const blobfishRouter = require("./routes/blobfish.router");
// Update or Get a specific design
const anglerfishRouter = require('./routes/anglerfish.router');
// Add a design to a user’s cart/Delete an item from cart_items where id = id (serial key)
const bassRouter = require( './routes/bass.router');


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
app.use("/api/flouder", flounderRouter);
app.use('/api/guppy', guppyRouter );
app.use('/api/catfish', catfishRouter);
app.use('/api/carp', carpRouter);
app.use('/api/bluegill', bluegillRouter);
app.use('/api/swordfish', swordfishRouter)
app.use("/api/blobfish", blobfishRouter);
app.use('/api/anglerfish', anglerfishRouter);
app.use('/api/bass', bassRouter);



// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
