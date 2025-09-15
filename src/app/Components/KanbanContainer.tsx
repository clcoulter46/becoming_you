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

    const onConfirmDelete = (id) => {
        try {
            const deletedTaskIndex = tasks.findIndex((task) => task.id === id)
            const newTaskList = tasks.splice(deletedTaskIndex, 1)
            setTaskList(newTaskList)
        } catch {
            return new Error(`deleting task unsuccessful for task id ${id}`)
        }
    }

    const onTaskStatusChange = async (status, id) => {
        try {
            const updatedTask = tasks.filter((task) => task.id === id)[0]
            updatedTask.status = status
            const updatedTaskList = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)

        } catch {
            return new Error(`updating task status Unsuccessful for task id ${id} - ${status} `)
        }
    }

    const onConfirmEdit = async (e) => {
        try {
            e.preventDefault()
            const form = e.target
            const formData = new FormData(form) 
            const formJson = Object.fromEntries(formData.entries())

            const updatedTask = tasks.filter((task) => task.id === Number(formJson.id))[0]
            updatedTask.title = formJson.title
            updatedTask.description = formJson.description
            updatedTask.assignee = formJson.assignee
            updatedTask.tags = String(formJson.tags).split(',')
            updatedTask.priority = formJson.priority

            const updatedTaskList = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)
        } catch {
            return new Error(`Editing task unsuccesful`)
        }
    }

    const onSearchSubmit = (e) => {
        e.preventDefault()
        console.log('hi')
        // setFilterStatus('all')
    }

    return (
        <>
            <SearchBar onSearchSubmit={onSearchSubmit} />
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
                        <KanbanCategory
                            category={"Scheduled"}
                            tasks={scheduledTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                            onConfirmEdit={onConfirmEdit}
                        />
                        <KanbanCategory
                            category={"In-progress"}
                            tasks={inProgressTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                            onConfirmEdit={onConfirmEdit}
                        />
                        <KanbanCategory
                            category={"Done"}
                            tasks={doneTasks}
                            onTaskStatusChange={onTaskStatusChange}
                            onConfirmDelete={onConfirmDelete}
                            onConfirmEdit={onConfirmEdit}
                        />
                    </>
                    : <div>Loading, please wait</div>}
            </div>
        </>
    );
}