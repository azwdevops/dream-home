const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

// mongoose setup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Db connected and server listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
