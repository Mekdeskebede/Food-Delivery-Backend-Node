// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Connect to MongoDB
try {
  mongoose.connect(
    "mongodb+srv://kebedemekdes289:myatlas289@cluster0.vp5y2kk.mongodb.net/?retryWrites=true&w=majority" ||
      "mongodb://127.0.0.1:27017/mydb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch {
  console.error("MongoDB connection error:", err);
}
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
const foodsRouter = require("./routes/foods");
const restaurantsRouter = require("./routes/restaurants");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/orders");

app.use("/users", usersRouter);
app.use("/foods", foodsRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
