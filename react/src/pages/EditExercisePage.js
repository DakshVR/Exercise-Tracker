import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// import './App.css';

function EditExercisePage({ exerciseToEdit }) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully Edited An Exercise")
        } else {
            alert(`Failed To Edit Exercise, Status Code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={reps}
                            onChange={e => setReps(e.target.value)} min="0" />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} min="0" />
                    </td>
                    <td>
                        <select id="dropdown" onChange={e => setUnit(e.target.value)} value={unit}>
                            <option value="lbs"> lbs</option>
                            <option value="kgs"> kgs</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={editExercise}
            >Save</button>

        </div>
    )
}

export default EditExercisePage;