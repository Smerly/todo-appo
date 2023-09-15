import { Link, useNavigate } from "react-router-dom"
import './LandingPage.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { update } from "../redux/reducer.ts"

function LandingPage() {
    // Query all tasks from Redux store
    const tasks = useSelector((state) => state.task.tasks)
    // Get dispatch from Redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // useState Vars

    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')
    const [sortTag, setSortTag] = useState('')
    const [power, setPower] = useState(false)
    const [powerAnimation, setPowerAnimation] = useState(false)
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

    // Querying for all tags that exists (leaving out duplicates)
    const getAllTags = () => {
        const alreadyAdded = []
        return tasks.map((each) => each.tags.map((eachIn) => {
                return eachIn.name
        }))
        .flat()
        .filter((eachIn) => { 
            if (!alreadyAdded.includes(eachIn)) {
                alreadyAdded.push(eachIn)
                return true
            }
            return false
        })
    }

    // Generating the progress bar with math and returning it
    const generateProgressBar = (task) => {
        let width = ''
        let completedListings = task.checklist.filter((eachIn) => eachIn.done === true)
        if (completedListings.length === 0) {
            width = '0%'
        } else {
            const percentage = completedListings.length / task.checklist.length
            width = `${Math.floor(percentage * 100)}%`
        }
        // 3
        return (
            <div>
                <div className={width === '0%' ? 'progress-bar-margined progress-bar' : 'progress-bar'} style={{width: width, height: 10, marginTop: 10}}>
                    <h2 className='progress-text'>{task.checklist.length > 0 ? String(width) : '0%'}</h2>
                </div>
            </div>
        )
    }

    // Make done attribute user friendly
    const checkDone = (current) => {
        if (current.done === true) {
            return 'done'
        }
        return 'pending'
    }

    // If the date of each task is the same day, display red warning, if its within 3 days, display basic warning.
    const checkIfTimeNear = (targetTime) => {
        if (new Date(targetTime).getDate() === new Date(currentTime).getDate() && targetTime - currentTime <= 259200000) {
            return 'today task-box-each'
        } else if (targetTime - currentTime <= 259200000) {
            return 'three-day task-box-each'
        } else {
            return 'task-box-each'
        }
    }
    
    // If the date is near, make exclamation
    const handleExclamation = (targetTime) => {
        if (targetTime - currentTime <= 259200000) {
            return 'exclamation'
        }
        return ''
    }       

    // Displaying all tasks

    const listOfTasks = () => {

        // 
        // Display for if power button is pressed
        // 

        if (power && tasks.length > 0) {
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
                    <Link to={`/view-task/${chosenTask.title}`} className={checkIfTimeNear(currentDate)}>
                    <div className={handleExclamation(currentDate)}></div>
                            <h2 className='regular-texted'>{chosenTask.title}</h2>
                            <header className='regular-texted'>Priority Level: ({chosenTask.priority}/10)</header>
                            <header className='regular-texted'>Complexity Level: ({chosenTask.complexity}/10)</header>
                            <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                            {generateProgressBar(chosenTask)}
                            {/* completion button */}
                        <button className='done-button-landing custom-button' onClick={(e) => {
                            dispatch(update({
                                title: chosenTask.title,
                                priority: chosenTask.priority,
                                complexity: chosenTask.complexity,
                                dueDatex: chosenTask.dueDatex,
                                checklist: chosenTask.checklist,
                                tags: chosenTask.tags,
                                originalTitle: chosenTask.originalTitle,
                                done: !chosenTask.done
                            }))
                            e.preventDefault()
                            }}> {checkDone(chosenTask)} </button>
                    </Link>
                </div>
            )
        }

        // 
        // Display without power button
        // 

        // This occurs when the power button is off and tasks has at least 1 item
        if (tasks.length > 0) {

            // Filter for search filter

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
                        <Link to={`/view-task/${each.title}`} className={checkIfTimeNear(currentDate)}>
                            <div className={handleExclamation(currentDate)}></div>
                            <h2 className='regular-texted'>{each.title}</h2>
                            <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                            <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                            <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                            {generateProgressBar(each)}
                            {/* completion button */}
                            <button className='done-button-landing custom-button' onClick={(e) => {
                                dispatch(update({
                                    title: each.title,
                                    priority: each.priority,
                                    complexity: each.complexity,
                                    dueDatex: each.dueDatex,
                                    checklist: each.checklist,
                                    tags: each.tags,
                                    originalTitle: each.originalTitle,
                                    done: !each.done
                                }))
                                e.preventDefault()
                                }}> {checkDone(each)} </button>
                        </Link>
                    </div>
                )
            } )
        } else {
            // If theres no tasks yet
            return (
                <div>nothing here yet.</div>
            )
        }
    }

    return (
        <div>
            <div className='landing-page-wrap'>
                <h1>
                    Tasks
                </h1> 

                {/* Search Filter */}

                <input type='text' className='input-text' onChange={(e) => setSearchFilter(e.target.value)} placeholder="Search.."/>
                <h2 className='sort-label'> Sort By Attribute or Tag </h2>
                <div className="row">
                    <div className='sort-box'>

                        {/* Sorter Options */}

                        <form>
                            <select className="custom-select" onChange={(e) => {
                                setSort(e.target.value)
                            }}>
                                <option value='default'>Date Created</option>
                                <option value='dateLow'>Date Ascending</option>
                                <option value='dateHigh'>Date Descending</option>
                                <option value="priorityLow">Priority Ascending</option>
                                <option value='priorityHigh'>Priority Descending</option>
                                <option value='complexityLow'>Complexity Ascending</option>
                                <option value='complexityHigh'>Complexity Ascending</option>
                            </select>
                        </form> 
                    </div>

                    {/* Tag Filter Dropdown */}

                    <div className="sort-box">
                        <form>
                            <select className="custom-select" onChange={(e) => {    
                                setSortTag(e.target.value)
                            }}>
                                <option value=''> No Tag </option>
                                {getAllTags().map((each) => {
                                    return (
                                        <option value={each}> {each} </option>    
                                    )
                                })}
                                </select>
                        </form> 
                    </div>
                </div>
                <div className='buttons-wrapper'>
                {/* Add Task Button */}
                <button onClick={() => navigate('./new-task')} className='add-button'>+</button>
                {/* Power Button */}
                <button onClick={() => {
                    if (tasks.length > 0) {
                        setPowerAnimation(!powerAnimation)
                        return setPower(!power)
                    } else {
                        alert ('No tasks yet, can\'t use power button.')
                    }
                    }} className={powerAnimation ? 'power-button-clicked power-button' : 'power-button'}></button>
                </div>
                <div className='tasks-wrapper'>
                {/* Render All Tasks */}
                {listOfTasks()}
            </div>
            </div>
        </div>
    )
}

export default LandingPage