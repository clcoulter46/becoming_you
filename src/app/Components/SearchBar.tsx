import React, { useEffect, useState } from "react";

export interface Props {
  onKeywordClick: Function,
  onAssigneeClick: Function,
  onTagClick: Function,
}

export default function SearchBar(props: Props): any {
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
          // @ts-ignore
          onChange={e => setKeywordSearch(e.target.value)}
        />
        <button
          className="button"
          onClick={e => props.onKeywordClick(e, keywordSearch)}
        >
          Search
        </button> 
        {/* TODO: make seach change when text changes */}
        {/* and add a clear search button */}
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
          // @ts-ignore
          onChange={e => setAssigneeSearch(e.target.value)}
        />
        <button
          className="button"
          onClick={e => props.onAssigneeClick(e, assigneeSearch)}
        >
          Search
        </button>
        {/* TODO: make seach change when text changes */}
        {/* and add a clear search button */}
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
          // @ts-ignore
          onChange={e => setTagSearch(e.target.value)}
        />
        <button
          className="button"
          onClick={e => props.onTagClick(e, tagSearch)}
        >
          Search
        </button>
        {/* TODO: make seach change when text changes */}
        {/* and add a clear search button */}
      </div>
    </div>
  );
}