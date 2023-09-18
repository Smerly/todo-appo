import { UseSelector, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"
import { update } from "../redux/reducer.ts"
import { current } from "@reduxjs/toolkit"

function Tasks (props) {
    const { searchFilter, sortTag, sort } = props
    // Redux Initializations
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.task.tasks)

    // useState Vars
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

    // Helper Functions

    // Sort Options
    const sortByValues = (a, b) => {
        if (sort === 'default') {
            return
        } else if (sort === 'dateLow') {
            return a.dueDatex - b.dueDatex
        } else if (sort === 'dateHigh') {
            return b.dueDatex - a.dueDatex
        } else if (sort === 'priorityLow') {
            return a.priority - b.priority
        } else if (sort === 'priorityHigh') {
            return b.priority - a.priority
        } else if (sort === 'complexityLow') {
            return a.complexity - b.complexity
        } else if (sort === 'complexityHigh') {
            return b.complexity - a.complexity
        } 
    }

    // Check if task has tag for filter
    const tagsHas = (input, target) => {
        const targettedTag = input.tags.find((each) => each.name === target)
        return targettedTag ? true : false
    }

    // Sorting by Tags
    const sortByTags = (input) => {
        if (sortTag === '') {
            return true
        }
        if (tagsHas(input, sortTag)) {
            return true
        }
        return false
    }
    

    // If the date of each task is the same day, display red warning, if its within 3 days, display basic warning.
    const checkIfTimeNear = (targetTime, currentTask) => {
        if (new Date(targetTime).getDate() === new Date(currentTime).getDate() && targetTime - currentTime <= 259200000 && !currentTask.done || targetTime - currentTime < 0) {
            return 'today task-box-each'
        } else if (targetTime - currentTime <= 259200000 && !currentTask.done) {
            return 'three-day task-box-each'
        } else {
            return 'task-box-each'
        }
    }

    // If the date is near, make exclamation
    const handleExclamation = (targetTime, currentTask) => {
        if (targetTime - currentTime <= 259200000 && !currentTask.done) {
            return 'exclamation'
        }
        return ''
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

    return tasks.filter((input) => {
        if (searchFilter.length === 0) {
            return sortByTags(input)
        } else if (input.title.includes(searchFilter)) {
            return sortByTags(input)
        }
    }).sort((a, b) => {
    // Filter by Date, Priority, and Complexity
    return sortByValues(a, b)
    }).map((each) => {

        // Render each task

        const currentDate = JSON.parse(each.dueDatex)
        let completedListings = each.checklist.filter((eachIn) => eachIn.done === true)
        const percentage = completedListings.length / each.checklist.length
        const width = `${Math.floor(percentage * 100)}%`
        return (
            // Because title has to be unique here
            <div key={each.title}>
                <div className='button-overlay' />
                <Link to={`/view-task/${each.title}`} className={checkIfTimeNear(currentDate, each)}>
                    <div className={handleExclamation(currentDate, each)}></div>
                    <h2 className={handleDoneCrossed(each, 'regular-texted')}>{each.title}</h2>
                    <header className={handleDoneCrossed(each, 'regular-texted')}>Priority Level: ({each.priority}/10)</header>
                    <header className={handleDoneCrossed(each, 'regular-texted')}>Complexity Level: ({each.complexity}/10)</header>
                    <div className={handleDoneCrossed(each, 'regular-texted')}>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                    {generateProgressBar(each)}
                    {/* completion button */}
                    <button className='done-button-landing custom-button' onClick={(e) => {
                        handleDone(each)
                        e.preventDefault()
                        }}> {checkDone(each)} </button>
                </Link>
            </div>
        )
    } )
}

export default Tasks