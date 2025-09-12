import React from "react";

export default function SearchBar(): any {
  const dropdownProps = []

  return (
    <div style={{ textAlign: "right" }}>
      <label>Filter by status:</label>
      <select name="filterStatus">
        <option value="scheduled">Scheduled</option>
        <option value="inProgress">In-progress</option>
        <option value="completed">Completed</option>
      </select>
      <br />
    </div>
  );
}