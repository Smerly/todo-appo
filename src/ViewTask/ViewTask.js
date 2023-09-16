import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { useParams, useNavigate, Link } from "react-router-dom"
import { remove, update } from "../redux/reducer.ts"
import Checklist from "./Checklist"
import Taglist from "./Taglist"
import { current } from "@reduxjs/toolkit"

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function ViewTask() {
    // Queries
    const tasks = useSelector((state) => state.task.tasks)
    const slug = useParams().slug

    // Helper Functions

    // Make done attribute user friendly
    const checkDone = (current) => {
        if (current.done === true) {
            return 'done'
        }
        return 'pending'
    }

    const deleteTask = () => {
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
    }
    
    // Generating the progress bar with math and returning it
    const generateProgressBar = () => {
        const completedListings = currentTask.checklist.filter((eachIn) => eachIn.done === true).length;
        const percentage = Math.floor((completedListings / currentTask.checklist.length) * 100)
        // Prevent edge case of return NaN
        const width = completedListings > 0 ? `${percentage}%` : "0%"
        return (
            <div>
                <div
                    className={`progress-bar ${completedListings > 0 ? 'progress-bar-margined' : ''}`}
                    style={{ width: width }}
                >
                    <h2 className="progress-text">{width}</h2>
                </div>
            </div>
        );
    };

    // Querying for the task we currently need to use
    const currentTask = tasks.filter((each) => {
        return each.title === slug
    })[0]

    const handleDone = () => {
        const shouldBeDone = currentTask.done 
        const doneChecklist = currentTask.checklist.map((each) => {
            return {id: each.id, name: each.name, done: !shouldBeDone}
        })
        dispatch(update({
            title: currentTask.title,
            priority: currentTask.priority,
            complexity: currentTask.complexity,
            dueDatex: currentDate,
            checklist: doneChecklist,
            tags: currentTask.tags,
            originalTitle: currentTask.originalTitle,
            done: !currentTask.done
        }))
    }

    const currentDate = JSON.parse(currentTask.dueDatex)

    // Redux Initializations
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    return (
        <div className='view-task-render'>
            <Link to={`/`} className='back-arrow'></Link>
            
            <div className='task-box'>
                <h1>Task Details</h1>
                <div className='dashed-decoration'>
                    <div className="row">

                        {/* Title */}

                        <h1 className='box-text'>{currentTask.title}</h1>
                        
                        {/* Edit Button */}

                        <Link to={`/edit-task/${currentTask.title}`} className='edit-icon'></Link>

                        {/* Delete Button */}

                        <button onClick={() => {
                            deleteTask()
                        }} className='delete-icon'></button>
                    </div>

                    {/* Due Date */}

                    <header>Due {`${monthsArr[new Date(currentDate).getMonth()]} ${new Date(currentDate).getDate()}, ${new Date(currentDate).getFullYear()}`}, {`${new Date(currentDate).toLocaleTimeString()}`}</header>

                    {/* Done/Undone Button */}

                    <button className='custom-button-margined custom-button' onClick={() => {
                        // Makes task done
                        handleDone()
                    }}> {checkDone(currentTask)} </button>

                    <h3>Priority: {currentTask.priority}</h3>

                    <h3>Complexity: {currentTask.complexity}</h3>
                    
                    {/* Checklist Component */}
                    <h3>Checklist:</h3>
                    <Checklist currentTask={currentTask} />
                    
                    <h2>Progress</h2>
                    <div className='progress-bar-div'>{generateProgressBar()}</div>

                    {/* Tags Component */}
                    <h3> Tags: </h3>
                    <Taglist currentTask={currentTask}/>
                </div>
            </div>
            
        </div>
    )
}

export default ViewTask