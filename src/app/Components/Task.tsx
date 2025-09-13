import React, { useState } from "react";

export default function Task({
    id,
    title,
    description,
    status,
    assignee,
    priority,
    tags,
    createdAt
}): any {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
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
            }}
            onClick={toggle}
        >
            <header
                style={{
                    textDecoration: "underline",
                    fontSize: "1.15rem"
                }}
            >
                {id} - <b>{title}</b>
            </header>
            {description ?
                <div
                    className="collapsible-description"
                >
                    {open ?
                        <div>
                            <b>{description}</b>
                            <br />
                            {priority.toUpperCase()}
                            <br />
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
        </div>
    );
}