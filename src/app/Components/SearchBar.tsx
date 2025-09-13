import React, { useEffect, useState } from "react";

export default function SearchBar(onChange): any {
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    console.log('filterStatus', filterStatus)
  }, [filterStatus])

  return (
    <div style={{ textAlign: "right" }}>
      <label>Filter by status:</label>
      <select
        name="filterStatus"
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
      >
        <option value="all">View All</option>
        <option value="scheduled">Scheduled</option>
        <option value="inProgress">In-progress</option>
        <option value="done">Done</option>
      </select>
      <br />
    </div>
  );
}