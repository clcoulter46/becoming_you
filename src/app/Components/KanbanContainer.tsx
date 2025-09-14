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
        if (tasks.length > 0) {
            let scheduledTaskList = tasks.filter((task: Object) => task?.status === "scheduled")
            let inProgressTaskList = tasks.filter((task: Object) => task?.status === "in-progress")
            let completedTaskList = tasks.filter((task: Object) => task?.status === "done")

            setScheduledTasks(scheduledTaskList)
            setInProgressTasks(inProgressTaskList)
            setCompletedTasks(completedTaskList)
        }
        console.log('huh')
    }, [tasks])

    useEffect(() => {
        //repeating this block for react storage reasons
        let scheduledTaskList = tasks.filter((task: Object) => task?.status === "scheduled")
        let inProgressTaskList = tasks.filter((task: Object) => task?.status === "in-progress")
        let completedTaskList = tasks.filter((task: Object) => task?.status === "done")

        setScheduledTasks(scheduledTaskList)
        setInProgressTasks(inProgressTaskList)
        setCompletedTasks(completedTaskList)
    }, [taskList])

    const onTaskStatusChange = async (status, id) => {
        try {
            const updatedTask = tasks.filter((task) => task.id === id)[0]
            updatedTask.status = status
            const updatedTaskList = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            console.log('status change', updatedTaskList)
            setTaskList(updatedTaskList)
        } catch {
            return new Error(`updating task status Unsuccessful for task id ${id} - ${status} `)
        }
    }

    const onConfirmDelete = async (id) => {
        try {
            const updatedTaskList = await tasks.filter((task) => task.id !== id)
            console.log('update', updatedTaskList)
            setTaskList(updatedTaskList)
            console.log('final', taskList)
        } catch {
            return new Error(`deleting task unsuccessful for task id ${id}`)
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
                <>{console.log('task list', taskList)}</>
                {taskList ?
                    <>
                        <KanbanCategory
                            category={"Scheduled"}
                            tasks={scheduledTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                        />
                        <KanbanCategory
                            category={"In-progress"}
                            tasks={inProgressTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                        />
                        <KanbanCategory
                            category={"Done"}
                            tasks={doneTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                        />
                    </>
                    : <div>Loading, please wait</div>}


            </div>
        </>
    );
}