import React, { useState, useRef, useEffect } from "react";

export default function EditModal({
    id,
    title,
    description,
    assignee,
    tags,
    priority,
    onConfirmEdit,
    onBackClick,
    onConfirmClick
}) {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newAssignee, setNewAssignee] = useState(assignee)
    const [newTags, setNewTags] = useState(tags)
    const [priorityStatus, setPriorityStatus] = useState(priority)
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
        <form className="edit-modal" id="edit-modal" onSubmit={onConfirmEdit}>
            <div>Make changes below, then Confirm to save changes.</div>
            <div style={{ flexDirection: "column" }}>
                <div>
                    <label>
                        <b>ID: {' '}</b>
                    </label>
                    <input
                        name="id"
                        value={id}
                        readOnly={true}
                    />
                </div>
                <div>
                    <label>
                        <b>Title: {' '}</b>
                        <br />
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
                <button type="button" onClick={onBackClick} className="button">Back</button>
                <button type="submit" className="button" onSubmit={onConfirmClick}>Confirm</button>
            </div>
        </form>
    )
}