import { UseSelector, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"
import { update } from "../redux/reducer.ts"

function PowerOnTasks () {
    // Redux Initializations
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.task.tasks)

    // useState Vars
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

    // Helper Functions

    // If the date of each task is the same day, display red warning, if its within 3 days, display basic warning.
    const checkIfTimeNear = (targetTime, currentTask) => {
        if (new Date(targetTime).getDate() === new Date(currentTime).getDate() && targetTime - currentTime <= 259200000 && !currentTask.done) {
            return 'today task-box-each'
        } else if (targetTime - currentTime <= 259200000 && !currentTask.done) {
            return 'three-day task-box-each'
        } else {
            return 'task-box-each'
        }
    }

    const handleDoneCrossed = (currentTask, defaultClass) => {
        if (currentTask.done) {
            return `done-crossed ${defaultClass}`
        }
        return defaultClass
    }

    const handleDone = (currentTask) => {
        const shouldBeDone = currentTask.done 
        const doneChecklist = currentTask.checklist.map((each) => {
            return {id: each.id, name: each.name, done: !shouldBeDone}
        })
        dispatch(update({
            title: currentTask.title,
            priority: currentTask.priority,
            complexity: currentTask.complexity,
            dueDatex: currentTask.dueDatex,
            checklist: doneChecklist,
            tags: currentTask.tags,
            originalTitle: currentTask.originalTitle,
            done: !currentTask.done
        }))
    }

    // If the date is near, make exclamation
    const handleExclamation = (targetTime, currentTask) => {
        if (targetTime - currentTime <= 259200000 && !currentTask.done) {
            return 'exclamation'
        }
        return ''
    }       

    // Generating the progress bar with math and returning it
    const generateProgressBar = (task) => {
        const completedListings = task.checklist.filter((eachIn) => eachIn.done === true).length;
        const percentage = Math.floor((completedListings / task.checklist.length) * 100)
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

    // Make done attribute user friendly
    const checkDone = (current) => {
        if (current.done === true) {
            return 'done'
        }
        return 'pending'
    }
    
    
    const copyTasks = [...tasks]
    copyTasks.sort((a, b) => {
        return (a.priority + a.complexity) - (b.priority + b.complexity)
    })
    const chosenTask = copyTasks.pop()
    let completedListings = chosenTask.checklist.filter((eachIn) => eachIn.done === true)
    const percentage = completedListings.length / chosenTask.checklist.length
    const width = `${Math.floor(percentage * 100)}%`
    const currentDate = JSON.parse(chosenTask.dueDatex)

    return (
        <div>
            <div className='button-overlay' />
            <Link to={`/view-task/${chosenTask.title}`} className={checkIfTimeNear(currentDate, chosenTask)}>
            <div className={handleExclamation(currentDate, chosenTask)}></div>
                    <h2 className={handleDoneCrossed(chosenTask, 'regular-texted')}>{chosenTask.title}</h2>
                    <header className={handleDoneCrossed(chosenTask, 'regular-texted')}>Priority Level: ({chosenTask.priority}/10)</header>
                    <header className={handleDoneCrossed(chosenTask, 'regular-texted')}>Complexity Level: ({chosenTask.complexity}/10)</header>
                    <div className={handleDoneCrossed(chosenTask, 'regular-texted')}>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                    {generateProgressBar(chosenTask)}
                    {/* completion button */}
                <button className='done-button-landing custom-button' onClick={(e) => {
                    handleDone(chosenTask)
                    e.preventDefault()
                    }}> {checkDone(chosenTask)} </button>
            </Link>
        </div>
    )
}

export default PowerOnTasks