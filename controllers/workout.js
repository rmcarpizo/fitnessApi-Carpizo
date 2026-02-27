const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

module.exports.addWorkout = (req, res) => {
	let newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration
	});

	return newWorkout.save()
		.then((savedWorkout) => res.status(201).send(savedWorkout))
		.catch(err => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
	return Workout.find({ userId: req.user.id })
		.then((workouts) => {
			return res.status(200).send({ workouts });
		})
		.catch(err => errorHandler(err, req, res));
};

module.exports.updateWorkout = (req, res) => {
	let workoutUpdates = {
		name: req.body.name,
		duration: req.body.duration
	};

	return Workout.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		workoutUpdates,
		{ new: true }
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
		.catch(err => errorHandler(err, req, res));
};

module.exports.deleteWorkout = (req, res) => {
	return Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
		.then((deletedWorkout) => {
			if (!deletedWorkout) {
				return res.status(404).send({ error: "Workout not found" });
			}
			return res.status(200).send({ message: "Workout deleted successfully" });
		})
		.catch(err => errorHandler(err, req, res));
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
		.catch(err => errorHandler(err, req, res));
};
