import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercise_db",
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

mongoose.set('useCreateIndex', true);

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: false },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find({ $and: filter })
        .select(projection)
        .limit(limit)
    return query.exec();
}

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date })
    return result.nModified;
}

const deleteById = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
}

export { createExercise, findExercises, updateExercise, deleteById }