

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin1234@carpizodb.35rk5vw.mongodb.net/fitnessApp?retryWrites=true&w=majority");

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

// Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
	app.listen(process.env.PORT || 4000, () => {
		console.log(`API is now online on port ${process.env.PORT || 4000}`);
	});
}

module.exports = { app, mongoose };

