const mongoose = require('mongoose');

/**
 * Connects to MongoDB. If the first attempt fails the server stays up
 * (pages show a friendly error) and the connection is retried.
 * Once connected, Mongoose reconnects on its own if the link drops.
 */
async function connectDB(uri, retryMs = 5000) {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected: database "${mongoose.connection.name}"`);
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.error(`Retrying in ${retryMs / 1000}s. Is mongod running and is MONGODB_URI correct?`);
    setTimeout(() => connectDB(uri, retryMs), retryMs);
  }
}

module.exports = connectDB;
