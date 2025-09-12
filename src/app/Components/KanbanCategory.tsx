import React, { useEffect, useState } from "react";

export default function KanbanCategory({category, tasks}): any {
  const [categoryTasks, setTasks] = useState([])

  useEffect(() => {
    console.log('blah')
  }, [tasks])

    return (
      <div>
        Category: {category} 
      </div>
    );
  }