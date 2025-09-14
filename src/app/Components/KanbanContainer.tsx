import React, { useEffect, useState } from "react";
import KanbanCategory from "./KanbanCategory";
import SearchBar from "./SearchBar"

export default function KanbanContainer({ tasks }): any {
    const [scheduledTasks, setScheduledTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [doneTasks, setCompletedTasks] = useState([])
    // const [filterStatus, setFilterStatus] = useState('all')
    const [taskList, setTaskList] = useState(tasks)

    useEffect(() => {
        // just for inital render
        if(tasks.length>0){
            let scheduledTaskList = tasks.filter((task: Object) => task?.status === "scheduled")
            let inProgressTaskList = tasks.filter((task: Object) => task?.status === "in-progress")
            let completedTaskList = tasks.filter((task: Object) => task?.status === "done")

            setScheduledTasks(scheduledTaskList)
            setInProgressTasks(inProgressTaskList)
            setCompletedTasks(completedTaskList)
        }
    }, [tasks])

    useEffect(() => {
        let scheduledTaskList = tasks.filter((task: Object) => task?.status === "scheduled")
        let inProgressTaskList = tasks.filter((task: Object) => task?.status === "in-progress")
        let completedTaskList = tasks.filter((task: Object) => task?.status === "done")

        setScheduledTasks(scheduledTaskList)
        setInProgressTasks(inProgressTaskList)
        setCompletedTasks(completedTaskList)
    }, [taskList]) //repeating this block for react storage reasons

    const onTaskStatusChange = (status, id) => {
        try {
            const updatedTask = tasks.filter((task) => task.id === id)[0]
            updatedTask.status = status
            const updatedTaskList = tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)
        } catch {
            return new Error(`updating task status Unsuccessful for task id ${id} - ${status} `)
        }
    }

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
                {taskList ? 
                <>
                    <KanbanCategory category={"Scheduled"} tasks={scheduledTasks} onTaskStatusChange={onTaskStatusChange} />
                    <KanbanCategory category={"In-progress"} tasks={inProgressTasks} onTaskStatusChange={onTaskStatusChange} />
                    <KanbanCategory category={"Done"} tasks={doneTasks} onTaskStatusChange={onTaskStatusChange} />
                </> 
                : <div>Loading, please wait</div>}


            </div>
        </>
    );
}