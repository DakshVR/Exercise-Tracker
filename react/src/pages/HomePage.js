import Exerciselist from '../components/Exerciselist';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";
// import './App.css';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h1>
                THE ONLY BAD WORKOUT IS NO WORKOUT!!
            </h1>
            <h2>
                Exercise Tracker
            </h2>
            <Exerciselist exercises={exercises} onDelete={onDelete} onEdit={onEdit}></Exerciselist>
            <p className="link">
                {/* <Link to="/EditExercise"> Go to the EditExercise Page</Link><br /> */}
                <Link to="/add-exercise"> Lets Add Excersie</Link>
            </p>
        </>
    );
}

export default HomePage;