import React, { useEffect, useState } from "react";

export default function SearchBar({
  onKeywordClick,
  onAssigneeClick,
  onTagClick
}): any {
  const [keywordSearch, setKeywordSearch] = useState("")
  const [assigneeSearch, setAssigneeSearch] = useState("")
  const [tagSearch, setTagSearch] = useState("")

  useEffect(() => {
  }, [])

  return (
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
          name="keyword"
          value={keywordSearch}
          onChange={e => setKeywordSearch(e.target.value)}
        />
        <button
          className="button"
          onClick={e => onKeywordClick(e, keywordSearch)}
        >
          Search
        </button>
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
        <button
          className="button"
          onClick={e => onAssigneeClick(e, assigneeSearch)}
        >
          Search
        </button>
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
        <button
          className="button"
          onClick={e => onTagClick(e, tagSearch)}
        >
          Search
        </button>
      </div>
    </div>
  );
}