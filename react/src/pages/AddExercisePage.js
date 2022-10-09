import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';

function AddExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully Added An Exercise")
        } else {
            alert(`Failed To Add An Exercise, Status Code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
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
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder="Enter Reps"
                            value={reps}
                            onChange={e => setReps(e.target.value)} min="0" />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Enter Weight"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} min="0" />
                    </td>
                    <td>
                        <select id="dropdown" onChange={e => setUnit(e.target.value)} >
                            <option value="lbs"> lbs</option>
                            <option value="kgs"> kgs</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Enter Date"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    )
}

export default AddExercisePage;