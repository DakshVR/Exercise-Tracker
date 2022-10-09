import * as exercises from './model.mjs';
import express from 'express';

const app = express();

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.use(express.json());

app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        })
})

app.get('/exercises', (req, res) => {
    const filter = []
    if (req.query.name) {
        filter.push({ name: req.query.name })
    }
    if (req.query.reps) {
        filter.push({ reps: req.query.reps })
    }
    if (req.query.weight) {
        filter.push({ weight: req.query.weight })
    }
    if (req.query.unit) {
        filter.push({ unit: req.query.unit })
    }
    if (req.query.date) {
        filter.push({ date: req.query.date })
    }

    if (filter.length === 0) {
        filter.push({})
    }
    exercises.findExercises(filter, '', 0)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request Failed' });
        });
});

app.put("/exercises/:_id", (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource Not Found' });
            }

        })
        .catch(error => {
            res.status(400).json({ Error: 'Request Failed' });
        });
});

app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource Not Found' });
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request Failed' });
        });
});
