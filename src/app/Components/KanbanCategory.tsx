import React from "react";

import Task from "./Task";

export interface Props {
  category: String,
  tasks: Array<Object>,
  onTaskStatusChange: Function,
  onConfirmDelete: Function,
  onConfirmEdit: Function,
}

export default function KanbanCategory(props: Props): any {
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
      <header
        style={{
          textDecoration: "underline",
          fontSize: "1.25rem",
        }}>
        <b>{props.category}</b>
      </header>
      <div style={{ flexDirection: "column" }}>
        {props.tasks ? props.tasks.map((task: any) => {
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
              // @ts-ignore
              onTaskStatusChange={event => props.onTaskStatusChange(event, task.id)}
              // @ts-ignore
              onConfirmDelete={event => props.onConfirmDelete(event, task.id)}
              // @ts-ignore
              onConfirmEdit={event => props.onConfirmEdit(event)}
            />
          )
        })
          : <div>No Tasks Yet!</div>}
      </div>
    </div>
  );
}