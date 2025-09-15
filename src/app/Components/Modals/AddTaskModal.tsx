import React, { useState, useRef, useEffect } from "react";

export default function AddTaskModal({
    onConfirmAddTask,
    onExitClick,
    onSubmitClick
}): any {
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newAssignee, setNewAssignee] = useState('')
    const [newTags, setNewTags] = useState('')
    const [priorityStatus, setPriorityStatus] = useState('LOW')
    const tagsRef = useRef(null)
    const descriptionRef = useRef(null)

    useEffect(() => {
        tagsRef.current.style.height = "0px"
        const scrollHeight = tagsRef.current.scrollHeight;
        tagsRef.current.style.height = scrollHeight + "px";
    }, [newTags])

    useEffect(() => {
        descriptionRef.current.style.height = "0px"
        const scrollHeight = descriptionRef.current.scrollHeight;
        descriptionRef.current.style.height = scrollHeight + "px";
    }, [newDescription])

    return (
        <form className="add-task" id="add-task" onSubmit={onConfirmAddTask}>
            <div>Fill out the fields below, then Confirm to save the task.</div>
            <div style={{ flexDirection: "column" }}>
                <div>
                    <label>
                        <b>Title: {' '}</b>
                        <input
                            name="title"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                        />
                    </label>
                </div>

                <hr />
                <div>
                    <label>
                        <b>Description: {' '}</b>
                        <textarea
                            name="description"
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            ref={descriptionRef}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    {/* TODO: be able to validate this from a list of names */}
                    <label>
                        <b>Assignee: {' '}</b>
                        <input
                            name="assignee"
                            value={newAssignee}
                            onChange={e => setNewAssignee(e.target.value)}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    <label>
                        <b>Tags (separate with commas): {' '}</b>
                        <textarea
                            name="tags"
                            value={newTags}
                            onChange={e => setNewTags(e.target.value)}
                            ref={tagsRef}
                        />
                    </label>
                </div>
                <hr />
                <b>Priority:</b>
                <div>
                    <select
                        name="priority"
                        value={priorityStatus}
                        onChange={e => setPriorityStatus(e.target.value)}
                    >
                        <option value="high">HIGH</option>
                        <option value="medium">MEDIUM</option>
                        <option value="low">LOW</option>
                    </select>
                    <br />
                </div>
            </div>
            <div className="evenly-spaced-buttons">
                <button type="button" onClick={onExitClick} className="button">Back</button>
                <button type="submit" className="button" onSubmit={onSubmitClick}>Confirm</button>
            </div>
        </form>
    )
}