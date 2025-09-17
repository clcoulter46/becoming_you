import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import TaskStatusOperations from "./TaskOperations/TaskStatusOperations";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";

export default function Task({
    id,
    title,
    description,
    status,
    assignee,
    priority,
    tags,
    createdAt,
    onTaskStatusChange,
    onConfirmDelete,
    onConfirmEdit,
}): any {
    const [open, setOpen] = useState(false)
    const [taskStatus, setTaskStatus] = useState(status)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const modalRef = useRef(null)

    const toggle = () => {
        setOpen(!open)
    }

    const onStatusChange = (option, id) => {
        if (['scheduled', 'in-progress', 'done'].includes(option) && option !== status) {
            setTaskStatus(option)
            onTaskStatusChange(option, id)
        }
    }

    const onEditClick = () => {
        if (showDeleteModal) {
            setShowDeleteModal(false)
        }
        setShowEditModal(true)
    }

    const onDeleteClick = () => {
        if (showEditModal) {
            setShowEditModal(false)
        }
        setShowDeleteModal(true)
    }

    const onBackClick = () => {
        setShowDeleteModal(false)
        setShowEditModal(false)
    }

    const onConfirmClick = () => {
        setShowEditModal(false)
    }

    return (
        <div
            ref={modalRef}
            style={{
                border: "black solid 1px",
                marginLeft: ".25rem",
                marginRight: ".25rem",
                marginBottom: ".25rem",
                textAlign: "left",
                padding: ".25rem",
                backgroundColor: "#f5ede4"
            }}
        >
            <header
                style={{
                    textDecoration: "underline",
                    fontSize: "1.15rem"
                }}
            >
                {id} - <b>{title}</b>
            </header>
            {(description || tags) ?
                <div
                    className="collapsible-description"
                    onClick={toggle}
                >
                    {open ?
                        <div>
                            <b>{description}</b>
                            <br />
                            {tags && <div><b>Tags:</b> {tags.map((tag) => <div key={tag}>- {tag}</div>)}</div>}
                        </div>
                        : <div style={{ textAlign: "center" }}>[ - - - ]</div>
                    }

                </div>
                : ''}
            <div style={{
                fontFamily: 'Times'
            }}>
                <i>Assigned: {assignee} | created: {createdAt ? createdAt : '09-09-2025, 11:59:33 AM'} |
                    Priority: {priority} | Tags: {tags.map((tag) => <i key={tag}>{tag} </i>)} </i>
            </div>
            <hr />
            <TaskStatusOperations status={taskStatus} onStatusChange={event => onStatusChange(event, id)} />
            <hr />
            <div className="evenly-spaced-buttons">
                <button onClick={() => onEditClick()} className="button">Edit</button>
                <button onClick={() => onDeleteClick()} style={{ color: "red" }} className="button">Delete</button>
            </div>
            <div />
            {showDeleteModal && createPortal((
                <DeleteModal
                    id={id}
                    onConfirmDelete={event => onConfirmDelete(event, id)}
                    onBackClick={onBackClick}
                />),
                modalRef.current
            )}
            <div onSubmit={onConfirmClick}>
                {showEditModal && createPortal((
                    <EditModal
                        id={id}
                        title={title}
                        description={description}
                        assignee={assignee}
                        tags={tags}
                        priority={priority}
                        onConfirmEdit={onConfirmEdit}
                        onBackClick={onBackClick}
                        onConfirmClick={onConfirmClick}
                    />),
                    modalRef.current
                )}
            </div>
        </div>
    );
}