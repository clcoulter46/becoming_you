import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import KanbanCategory from "./KanbanCategory";
import SearchBar from "./SearchBar"
import AddTaskModal from "./Modals/AddTaskModal";

export default function KanbanContainer({ tasks }): any {
    const [scheduledTasks, setScheduledTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [doneTasks, setCompletedTasks] = useState([])
    const [taskList, setTaskList] = useState(tasks)
    const [filterList, setFilterList] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const addModalRef = useRef(null)

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

    useEffect(() => {
        let scheduledTaskList = filterList.filter((task: Object) => task?.status === "scheduled")
        let inProgressTaskList = filterList.filter((task: Object) => task?.status === "in-progress")
        let completedTaskList = filterList.filter((task: Object) => task?.status === "done")

        setScheduledTasks(scheduledTaskList)
        setInProgressTasks(inProgressTaskList)
        setCompletedTasks(completedTaskList)
    }, [filterList])

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
        e.preventDefault()
        try {
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

    const onKeywordClick = async (e, keyword) => {
        e.preventDefault()
        try {
            const filteredList = await tasks.filter((task) => {
                const listValues = Object.values(task)
                return listValues.some((value) => {
                    return String(value).toLowerCase().includes(keyword.toLowerCase())
                })
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for keyword ${keyword} unsuccessful`)
        }
    }

    const onAssigneeClick = async (e, assignee) => {
        e.preventDefault()
        try {
            const filteredList = await tasks.filter((task) => {
                return String(task.assignee).toLowerCase().includes(assignee.toLowerCase())
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for keyword ${keyword} unsuccessful`)
        }
    }

    const onTagClick = async (e, tag) => {
        e.preventDefault()
        try {
            const filteredList = await tasks.filter((task) => {
                const listValues = task.tags
                return listValues.some((value) => {
                    return String(value).toLowerCase().includes(tag.toLowerCase())
                })
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for keyword ${keyword} unsuccessful`)
        }
    }

    const onAddTaskClick = () => {
        setShowAddModal(true)
    }

    const onConfirmAddTask = (e) => {
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            let newTask = {
                id: 0,
                title: '',
                description: '',
                assignee: '',
                tags: [],
                priority: '',
                status: '',
            }
            var randomId = Math.floor(Math.random() * 90) + 15;
            newTask.id = randomId
            //normally a database would just do this so I'm making something work for now
            newTask.title = String(formJson.title)
            newTask.description = String(formJson?.description)
            newTask.assignee = String(formJson.assignee)
            if (formJson.tags) { 
                // need to make this .map()
                newTask.tags = String(formJson?.tags).split(',').join()
            } 
            newTask.priority = String(formJson?.priority)
            newTask.status = "scheduled"
            const newDate = new Date();
            newTask.createdAt = newDate.toLocaleString()
            let updatedList
            if (taskList) {
                updatedList = taskList.push(newTask)
            } else {
                updatedList = [newTask]
            }
            
            setTaskList(updatedList)
            tasks.push(newTask)
        } catch (error){
            console.error('error', error)
            return new Error(`Unable to create new task`)
        }
        setShowAddModal(false)
    }

    const onExitClick = () => {
        setShowAddModal(false)
    }

    return (
        <div ref={addModalRef}>
            {showAddModal ? createPortal((
                <AddTaskModal
                    onConfirmAddTask={onConfirmAddTask}
                    onExitClick={onExitClick}
                />),
                addModalRef.current
            ) :
                <div>
                    <button
                        className="button"
                        onClick={() => onAddTaskClick()}
                    >
                        Add New Task
                    </button>
                    <SearchBar
                        onKeywordClick={onKeywordClick}
                        onAssigneeClick={onAssigneeClick}
                        onTagClick={onTagClick}
                    />

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
                </div>}
        </div>
    );
}