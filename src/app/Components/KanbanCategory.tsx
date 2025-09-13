import React, { useEffect, useState } from "react";

import Task from "./Task";

export default function KanbanCategory({ category, tasks }): any {
  const [categoryTasks, setTasks] = useState([])

  useEffect(() => {
    console.log('blah')
  }, [categoryTasks])

  return (
    <div
      className="kanban-category"
      style={{
        border: "black solid 2px",
        flexGrow: "1",
        flexBasis: "0",
        background: "#71a2db",
        opacity: "0.7"
      }}
    >
      <header style={{ textDecoration: "underline", fontSize: "1.25rem" }}><b>{category}</b></header>
      <div style={{ flexDirection: "column" }}>
        {tasks ? tasks.map((task) => {
          return (
            <Task
              id={task.id}
              key={task.id}
              title={task.title}
              assignee={task.assignee}
              description={task.description}
              priority={task.priority}
              status={task.status}
              tags={task.tags}
              createdAt={task.createdAt}
            />
          )
        })
          : ''}
      </div>
    </div>
  );
}