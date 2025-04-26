const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require('./models/User')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/snakegameDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const userRoutes = require("./routes/userRoutes");
const scoreBoard = require("./routes/scoreBoard")

app.use("/api/users", userRoutes);

app.use('/scoreBoard',scoreBoard)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
