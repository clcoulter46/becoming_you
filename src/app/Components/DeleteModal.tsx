import React from "react";

export default function DeleteModal({
    id,
    onConfirmDelete,
    onBackClick
}) {

    return (
        <div className="delete-modal" id="delete-modal">
            <div>Are you sure you want to delete this task?</div>
            <div className="evenly-spaced-buttons">
                <button onClick={onBackClick}>Back</button>
                <button onClick={() => onConfirmDelete(id)} style={{color: "red"}}>Confirm</button>
            </div>
        </div>
    )
}