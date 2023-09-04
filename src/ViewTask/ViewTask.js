import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"
import { useParams, useNavigate, Link } from "react-router-dom"
import { remove, update } from "../redux/reducer.ts"

function ViewTask() {
    const tasks = useSelector((state) => state.task.tasks)
    const slug = useParams().slug
    // useState Vars

    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [dueDate, setDueDate] = useState(new Date().getTime())
    console.log(dueDate)

    const [checklist, setChecklist] = useState([]);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState([])
    const [eachTag, setEachTag] = useState('')

    // Helper Vars
    
    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 10]
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // These 2 functions makes it so if the checklist/taglist has at least 1 item, it will display, otherwise, it will say theres nothing

    const checklistExists = () => {
        if (currentTask().checklist.length > 0) {
            return (
                 <div className='checklist-box'>
                    {currentTask().checklist.map((each) => {
                        return (
                            <div className='list-item-box'>{each}</div>
                        )
                    })}
                </div>
            )
        } else {
            return <header>No Checklist Items yet.</header>
        }
    }

    const tagsExists = () => {
        if (currentTask().tags.length > 0) {
            return (
                <div className='tags-box'>
                    {currentTask().tags.map((each) => {
                        return (
                            <div className='tag-box'>{each}</div>
                        )
                    })}
                </div>
            )
        } else {
            return <header> No Tags Yet.</header>
        }
    }

    // Querying for the task we currently need to use
    const currentTask = () => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].title === slug) {
                return tasks[i]
            }
        }
    }
    const currentDate = JSON.parse(currentTask().dueDatex)
    console.log(currentDate)
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Link to={`/`} className='back-arrow'></Link>
            <h1>Task Details</h1>
            
            <div className='task-box'>
                <div className='dashed-decoration'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>

                        {/* Title */}

                        <h1 className='box-text' style={{ marginRight: 'auto'}}>{currentTask().title}</h1>
                        
                        {/* Edit Button */}

                        <Link to={`/edit-task/${currentTask().title}`} className='edit-icon'></Link>

                        {/* Delete Button */}

                        <button onClick={() => {
                            dispatch(remove({
                                title: currentTask().title,
                                priority: currentTask().priority,
                                complexity: currentTask().complexity,
                                dueDatex: Number(currentDate),
                                checklist: currentTask().checklist,
                                tags: currentTask().tags,
                                originalTitle: currentTask().title
                            }))
                            navigate('/')
                        }} className='delete-icon'>X</button>
                    </div>

                    {/* Due Date */}

                    <header>Due {`${monthsArr[new Date(currentDate).getMonth()]} ${new Date(currentDate).getDate()}, ${new Date(currentDate).getFullYear()}`}, {`${new Date(currentDate).toLocaleTimeString()}`}</header>

                    {/* Done/Undone Button */}

                    <button className='custom-button' style={{margin: 20}} onClick={() => {
                        dispatch(update({
                            title: currentTask().title,
                            priority: currentTask().priority,
                            complexity: currentTask().complexity,
                            dueDatex: currentDate,
                            checklist: currentTask().checklist,
                            tags: currentTask().tags,
                            originalTitle: currentTask().originalTitle,
                            done: !currentTask().done
                        }))
                        navigate('/')
                    }}> done </button>

                    {/* Priority */}

                    <h3>Priority: {currentTask().priority}</h3>

                    {/* Complexity */}

                    <h3>Complexity: {currentTask().complexity}</h3>
                    
                    {/* Checklist */}

                    <h3>Checklist:</h3>
                    {checklistExists()}

                    {/* Tags */}

                    <h3> Tags: </h3>
                    {tagsExists()}
                </div>
            </div>
            
        </div>
    )
}

export default ViewTask