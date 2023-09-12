import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { useParams, useNavigate, Link } from "react-router-dom"
import { remove, update } from "../redux/reducer.ts"

function ViewTask() {
    const tasks = useSelector((state) => state.task.tasks)
    const slug = useParams().slug

    // Helper Vars

    // Make done attribute user friendly
    const checkDone = (current) => {
        if (current.done === true) {
            return 'done'
        }
        return 'pending'
    }

    // Helper Functions
    
    // Generate progress bar with math and render it
    const generateProgressBar = () => {
        let width = ''
        let completedListings = currentTask.checklist.filter((eachIn) => eachIn.done === true)
        if (completedListings.length === 0) {
            width = '0%'
        } else {
            const percentage = completedListings.length / currentTask.checklist.length
            width = `${Math.floor(percentage * 100)}%`
        }
        // 3
        return (
            <div>
                <div className='progress-bar' style={{width: width}}>
                    <h2 className='progress-text'>{currentTask.checklist.length > 0 ? String(width) : '0%'}</h2>
                </div>
            </div>
        )
    }

    // Querying for the task we currently need to use
    const currentTask = tasks.filter((each) => {
        return each.title === slug
    })[0]

    const currentDate = JSON.parse(currentTask.dueDatex)
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Redux Initializations
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // These 2 functions makes it so if the checklist/taglist has at least 1 item, it will display, otherwise, it will say theres nothing

    const checklistExists = () => {
        if (currentTask.checklist.length > 0) {
            return (
                 <div className='checklist-box'>
                    {currentTask.checklist.map((each, i) => {
                        return (
                            <div key={i} className={ each.done ? 'crossed-out list-item-box' : 'list-item-box'}>
                                {each.name}
                                <button className={ each.done ? 'undo done-list' : 'done-list'} style={{marginLeft: 'auto'}} onClick={(e) => {
                                    let updatedChecklist = {}
                                    for (let i = 0; i < currentTask.checklist.length; i++) {
                                        if (each.id === currentTask.checklist[i].id) {
                                            updatedChecklist = [...currentTask.checklist]
                                            updatedChecklist[i] = {id: each.id, name: each.name, done: !each.done}
                                        }
                                    }
                                    dispatch(update({
                                        title: currentTask.title,
                                        priority: currentTask.priority,
                                        complexity: currentTask.complexity,
                                        dueDatex: currentDate,
                                        checklist: updatedChecklist,
                                        tags: currentTask.tags,
                                        originalTitle: currentTask.originalTitle,
                                        done: currentTask.done
                                    }))
                                }}></button>
                                <button className='delete-list' onClick={(e) => {
                                    // Delete checklist item
                                    const updatedChecklist = currentTask.checklist.filter((eachIn) => eachIn.id !== each.id)
                                    dispatch(update({
                                        title: currentTask.title,
                                        priority: currentTask.priority,
                                        complexity: currentTask.complexity,
                                        dueDatex: currentDate,
                                        checklist: updatedChecklist,
                                        tags: currentTask.tags,
                                        originalTitle: currentTask.originalTitle,
                                        done: currentTask.done
                                    }))
                                }}></button>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <header>No Checklist Items yet.</header>
        }
    }

    const tagsExists = () => {
        if (currentTask.tags.length > 0) {
            return (
                <div className='tags-box'>
                    {currentTask.tags.map((each, i) => {
                        return (
                            <div key={i} className='tag-box'>
                                {each.name}
                                <button className='delete-list' onClick={(e) => {
                                    // e.preventDefault()
                                    const updatedTag = currentTask.tags.filter((each2) => each2.id !== each.id)
                                    dispatch(update({
                                        title: currentTask.title,
                                        priority: currentTask.priority,
                                        complexity: currentTask.complexity,
                                        dueDatex: currentDate,
                                        checklist: currentTask.checklist,
                                        tags: updatedTag,
                                        originalTitle: currentTask.originalTitle,
                                        done: currentTask.done
                                    }))
                                }}></button>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <header> No Tags Yet.</header>
        }
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Link to={`/`} className='back-arrow'></Link>
            
            <div className='task-box'>
                <h1>Task Details</h1>
                <div className='dashed-decoration'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>

                        {/* Title */}

                        <h1 className='box-text' style={{ marginRight: 'auto'}}>{currentTask.title}</h1>
                        
                        {/* Edit Button */}

                        <Link to={`/edit-task/${currentTask.title}`} className='edit-icon'></Link>

                        {/* Delete Button */}

                        <button onClick={() => {
                            dispatch(remove({
                                title: currentTask.title,
                                priority: currentTask.priority,
                                complexity: currentTask.complexity,
                                dueDatex: Number(currentDate),
                                checklist: {name: currentTask.checklist, done: currentTask.done},
                                tags: currentTask.tags,
                                originalTitle: currentTask.title
                            }))
                            navigate('/')
                        }} className='delete-icon'></button>
                    </div>

                    {/* Due Date */}

                    <header>Due {`${monthsArr[new Date(currentDate).getMonth()]} ${new Date(currentDate).getDate()}, ${new Date(currentDate).getFullYear()}`}, {`${new Date(currentDate).toLocaleTimeString()}`}</header>

                    {/* Done/Undone Button */}

                    <button className='custom-button' style={{margin: 20}} onClick={() => {
                        dispatch(update({
                            title: currentTask.title,
                            priority: currentTask.priority,
                            complexity: currentTask.complexity,
                            dueDatex: currentDate,
                            checklist: currentTask.checklist,
                            tags: currentTask.tags,
                            originalTitle: currentTask.originalTitle,
                            done: !currentTask.done
                        }))
                        // navigate('/')
                    }}> {checkDone(currentTask)} </button>

                    {/* Priority */}

                    <h3>Priority: {currentTask.priority}</h3>

                    {/* Complexity */}

                    <h3>Complexity: {currentTask.complexity}</h3>
                    
                    {/* Checklist */}

                    <h3>Checklist:</h3>
                    {checklistExists()}
                    <h2>Progress</h2>
                    <div style={{marginLeft: 50}}>{generateProgressBar()}</div>

                    {/* Tags */}

                    <h3> Tags: </h3>
                    {tagsExists()}
                </div>
            </div>
            
        </div>
    )
}

export default ViewTask