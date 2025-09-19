import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import TaskStatusOperations from "./TaskOperations/TaskStatusOperations";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";

export interface Props {
    id: string,
    title: string,
    description: string,
    status: string,
    assignee: string,
    priority: string,
    tags: Array<string>,
    createdAt: string,
    onTaskStatusChange: Function,
    onConfirmDelete: Function,
    onConfirmEdit: Function
}

export default function Task(props: Props): any {
    const [open, setOpen] = useState(false)
    const [taskStatus, setTaskStatus] = useState(props.status)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const modalRef = useRef(null)

    const toggle = () => {
        setOpen(!open)
    }

    // @ts-ignore
    const onStatusChange = (option, id) => {
        if (['scheduled', 'in-progress', 'done'].includes(option) && option !== props.status) {
            setTaskStatus(option)
            props.onTaskStatusChange(option, id)
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
                {props.id} - <b>{props.title}</b>
            </header>
            {(props.description || props.tags) ?
                <div
                    className="collapsible-description"
                    onClick={toggle}
                >
                    {open ?
                        <div>
                            <b>{props.description}</b>
                            <br />
                            {props.tags && <div><b>Tags:</b> {props.tags.map((tag) => <div key={tag}>- {tag}</div>)}</div>}
                        </div>
                        : <div style={{ textAlign: "center" }}>[ - - - ]</div>
                    }

                </div>
                : ''}
            <div style={{
                fontFamily: 'Times'
            }}>
                <i>Assigned: {props.assignee} | created: {props.createdAt ? props.createdAt : '09-09-2025, 11:59:33 AM'} |
                    Priority: {props.priority} | Tags: {props.tags.map((tag) => <i key={tag}>{tag} </i>)} </i>
            </div>
            <hr />
            {/* @ts-ignore */}
            <TaskStatusOperations status={taskStatus} onStatusChange={event => onStatusChange(event, props.id)} />
            <hr />
            <div className="evenly-spaced-buttons">
                <button onClick={() => onEditClick()} className="button">Edit</button>
                <button onClick={() => onDeleteClick()} style={{ color: "red" }} className="button">Delete</button>
            </div>
            <div />
            {showDeleteModal && createPortal((
                <DeleteModal
                    id={props.id}
                    // @ts-ignore
                    onConfirmDelete={event => props.onConfirmDelete(event, props.id)}
                    onBackClick={onBackClick}
                />),
                // @ts-ignore
                modalRef.current
            )}
            <div onSubmit={onConfirmClick}>
                {showEditModal && createPortal((
                    <EditModal
                        id={props.id}
                        title={props.title}
                        description={props.description}
                        assignee={props.assignee}
                        tags={props.tags}
                        priority={props.priority}
                        onConfirmEdit={props.onConfirmEdit}
                        onBackClick={onBackClick}
                        onConfirmClick={onConfirmClick}
                    />),
                    // @ts-ignore
                    modalRef.current
                )}
            </div>
        </div>
    );
}