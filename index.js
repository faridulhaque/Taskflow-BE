const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./src/routes/auth.routes.js");
const taskRoutes = require("./src/routes/task.routes.js");
const { commonError } = require("./src/middleWares/commonError.js");
const UserModel = require("./src/models/user.model.js");

const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.options(/.*/, cors(corsConfig));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get(
  "/health",
  async (req, res) => {
    const user = await UserModel.findOne(
      { email: "test@faridmurshed.dev" },
      { _id: 1, email: 1 }
    );

    res.status(200).json({ message: user.email });
  },
  commonError
);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// connect with mongodb

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server has been connected to ${PORT}`));
  })
  .catch((error) => console.log(error, `did not connect to ${PORT}`));
