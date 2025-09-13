import React, { useEffect, useState } from "react";
import KanbanCategory from "./KanbanCategory";
import SearchBar from "./SearchBar"

export default function KanbanContainer({ tasks }): any {
    const [scheduledTasks, setScheduledTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [filterStatus, setFilterStatus] = useState('all')

    useEffect(() => {
        if (tasks.length > 0) {
            let scheduledTaskList = tasks.filter((task: Object) => task?.status === "scheduled")
            let inProgressTaskList = tasks.filter((task: Object) => task?.status === "in-progress")
            let completedTaskList = tasks.filter((task: Object) => task?.status === "done")
            console.log('filters', scheduledTaskList, inProgressTaskList, completedTaskList)

            setScheduledTasks(scheduledTaskList)
            setInProgressTasks(inProgressTaskList)
            setCompletedTasks(completedTaskList)
        }

    }, [tasks])

    const onFilterChange = () => {
        console.log('hi')
        // setFilterStatus('all')
    }

    return (
        <>
            <SearchBar onChange={onFilterChange} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-evenly",
                    flexGrow: "1"
                }}
            >
                {filterStatus === "scheduled" ?
                    <KanbanCategory category={"Scheduled"} tasks={scheduledTasks} />
                    : filterStatus === "inProgress" ?
                        <KanbanCategory category={"In-progress"} tasks={inProgressTasks} />
                        : filterStatus === "done" ?
                            <KanbanCategory category={"Done"} tasks={completedTasks} />
                            :
                            <>
                                <KanbanCategory category={"Scheduled"} tasks={scheduledTasks} />
                                <KanbanCategory category={"In-progress"} tasks={inProgressTasks} />
                                <KanbanCategory category={"Done"} tasks={completedTasks} />
                            </>
                }

            </div>
        </>
    );
}