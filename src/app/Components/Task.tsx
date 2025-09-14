import React, { useEffect, useState } from "react";
import PrioritySelect from "./PrioritySelect";
import TaskOperations from "./TaskOperations";

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
}): any {
    const [open, setOpen] = useState(false)
    const [taskStatus, setTaskStatus] = useState(status)

    const toggle = () => {
        setOpen(!open)
    }

    const onStatusChange = (option, id) => { 
        if(['scheduled', 'in-progress', 'done'].includes(option) && option !== status){
            setTaskStatus(option)
            onTaskStatusChange(option, id)      
        }
    }

    return (
        <div
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
            {(description || tags)?
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
                <i>Assigned: {assignee} | created: {createdAt ? createdAt : '2025-09-01 11:59AM'}</i>
            </div>
            <b>Priority:</b> <PrioritySelect priority={priority} />
            <div><TaskOperations status={taskStatus} onStatusChange={event => onStatusChange(event, id)}/></div>
        </div>
    );
}