import React, { useEffect, useState } from "react";

export default function SearchBar(onSearchSubmit): any {
  const [filterStatus, setFilterStatus] = useState("all")
  const [keywordSearch, setKeywordSearch] = useState("")
  const [assigneeSearch, setAssigneeSearch] = useState("")
  const [tagSearch, setTagSearch] = useState("")

  useEffect(() => {
    console.log('filterStatus', filterStatus)
  }, [filterStatus])

  return (
    <form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "3px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <label>Search by keyword: </label>
          <input
            className="search-bar"
            width={20}
            name="text"
            value={keywordSearch}
            onChange={e => setKeywordSearch(e.target.value)}
          />
          <button className="button">Search</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <label>Search by Assignee: </label>
          <input
            className="search-bar"
            name="asignee"
            value={assigneeSearch}
            onChange={e => setAssigneeSearch(e.target.value)}
          />
          <button className="button">Search</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <label>Search by tags:</label>
          <input
            className="search-bar"
            name="tags"
            value={tagSearch}
            onChange={e => setTagSearch(e.target.value)}
          />
          <button className="button">Search</button>
        </div>
      </div>
    </form>
  );
}