const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
	let newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration
	});

	return newWorkout.save()
		.then((savedWorkout) => res.status(201).send(savedWorkout))
		.catch((err) => {
			console.error("Error in saving workout: ", err);
			return res.status(500).send({ error: "Failed to save the workout" });
		});
};

module.exports.getMyWorkouts = (req, res) => {
	return Workout.find({ userId: req.user.id })
		.then((workouts) => {
			return res.status(200).send({ workouts });
		})
		.catch((err) => {
			console.error("Error in fetching workouts: ", err);
			return res.status(500).send({ error: "Error finding workouts." });
		});
};

module.exports.updateWorkout = (req, res) => {
	let workoutUpdates = {
		name: req.body.name,
		duration: req.body.duration
	};

	return Workout.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		workoutUpdates,
		{ new: false }
	)
		.then((updatedWorkout) => {
			if (!updatedWorkout) {
				return res.status(404).send({ error: "Workout not found" });
			}
			return res.status(200).send({
				message: "Workout updated successfully",
				updatedWorkout: updatedWorkout
			});
		})
		.catch((err) => {
			console.error("Error in updating workout: ", err);
			return res.status(500).send({ error: "Error in updating a workout." });
		});
};

module.exports.deleteWorkout = (req, res) => {
	return Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
		.then((deletedWorkout) => {
			if (!deletedWorkout) {
				return res.status(404).send({ error: "Workout not found" });
			}
			return res.status(200).send({ message: "Workout deleted successfully" });
		})
		.catch((err) => {
			console.error("Error in deleting workout: ", err);
			return res.status(500).send({ error: "Error in deleting a workout." });
		});
};

module.exports.completeWorkoutStatus = (req, res) => {
	return Workout.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ status: "completed" },
		{ new: true }
	)
		.then((updatedWorkout) => {
			if (!updatedWorkout) {
				return res.status(404).send({ error: "Workout not found" });
			}
			return res.status(200).send({
				message: "Workout status updated successfully",
				updatedWorkout: updatedWorkout
			});
		})
		.catch((err) => {
			console.error("Error in updating workout status: ", err);
			return res.status(500).send({ error: "Error in updating workout status." });
		});
};
