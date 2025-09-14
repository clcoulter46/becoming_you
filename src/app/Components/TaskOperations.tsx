import React, { useState } from "react";

export default function TaskOperations({status, onStatusChange}) {
    const [operation, setOperation] = useState('View All Options')

    return (
        <div onChange={event => onStatusChange(event.target.value)}>
            <label><b>Update: </b></label>
            <select
                name="operation"
                value={operation}
                onChange={event => setOperation(event.target.value)}
            >
                <option value="viewAll">View All Options</option>
                {!(status === "scheduled") && <option value="scheduled">Mark Scheduled</option>}
                {!(status === "in-progress") &&<option value="in-progress">Mark In-progress</option>}
                {!(status === "done") &&<option value="done">Mark Done</option>}
                <option value="edit">Edit Task</option>
                <option value="delete">Delete Task</option>
            </select>
        </div>
    )
}