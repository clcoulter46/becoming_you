import React, { useState } from "react";

export default function TaskStatusOperations({status, onStatusChange}) {
    const [operation, setOperation] = useState('all')

    return (
        <div onChange={event => onStatusChange(event.target.value)}>
            <label><b>Update task status: </b></label>
            <select
                name="operation"
                value={operation}
                onChange={event => setOperation(event.target.value)}
                style={{alignItems: "revert"}}
            >
                <option value="all"> - - - - - - - - - - - - </option>
                {!(status === "scheduled") && <option value="scheduled">Mark Scheduled</option>}
                {!(status === "in-progress") &&<option value="in-progress">Mark In-progress</option>}
                {!(status === "done") &&<option value="done">Mark Done</option>}
            </select>
        </div>
    )
}