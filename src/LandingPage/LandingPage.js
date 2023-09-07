import { Link, useNavigate } from "react-router-dom"
import './LandingPage.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { update } from "../redux/reducer.ts"
import { current } from "@reduxjs/toolkit"

function LandingPage() {
    // Query all tasks from Redux store
    const tasks = useSelector((state) => state.task.tasks)
    // Get dispatch from Redux
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // useState Vars

    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')
    const [power, setPower] = useState(false)
    const [powerAnimation, setPowerAnimation] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

    // Helper Function

    // Make done attribute user friendly
    const checkDone = (current) => {
        if (current.done === true) {
            return 'done'
        }
        return 'pending'
    }

    const notCurrentDone = (each) => {
        if (each.done === 'done') {
            return 'pending'
        }
        return 'done'
    }

    const checkIfTimeNear = (targetTime) => {
        if (new Date(targetTime).getDate() === new Date(currentTime).getDate() && targetTime - currentTime <= 259200000) {
            return 'today task-box-each'
        } else if (targetTime - currentTime <= 259200000) {
            return 'three-day task-box-each'
        } else {
            return 'task-box-each'
        }
    }
    
    const handleExclamation = (targetTime) => {
        if (targetTime - currentTime <= 259200000) {
            return 'exclamation'
        }
        return ''
    }

    // const powerButtonRotate = () => {
    //     document.getElementById('img').className = 'power-button-click'
    // }
         

    // Displaying all tasks

    const listOfTasks = () => {

        // 
        // Display for if power button is pressed
        // 

        if (power && tasks) {
            console.log(tasks)
            const copyTasks = [...tasks]
                copyTasks.sort((a, b) => {
                    return (a.priority + a.complexity) - (b.priority + b.complexity)
                })
            const chosenTask = copyTasks.pop()
            const currentDate = JSON.parse(chosenTask.dueDatex)
            return (
                <div>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${chosenTask.title}`} className={checkIfTimeNear(currentDate)} style={{textDecoration: 'none'}}>
                            <div className={handleExclamation(currentDate)}></div>
                                    <h2 className='regular-texted'>{chosenTask.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({chosenTask.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({chosenTask.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                                    {/* completion button */}
                                <button className='custom-button' style={{margin: 20}} onClick={(e) => {
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

        if (tasks) {
                return tasks.filter((input) => {
                    if (searchFilter.length === 0) {
                        return input
                    } else if (input.title.includes(searchFilter)) {
                        return input
                    }   
                }).sort((a, b) => {
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
                }).map((each, i) => {
                    const currentDate = JSON.parse(each.dueDatex)
                    return (
                        <div key={i}>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${each.title}`} className={checkIfTimeNear(currentDate)} style={{textDecoration: 'none'}}>
                                <div className={handleExclamation(currentDate)}></div>
                                    <h2 className='regular-texted'>{each.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                                    {/* completion button */}
                                    <button className='custom-button' style={{margin: 20}} onClick={(e) => {
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
                <div>

                    {/* Sorter Options */}

                    <h2 style={{textAlign: 'center'}}> Sort By.. </h2>
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
                <div className='buttons-wrapper'>
                <button onClick={() => navigate('./new-task')} className='add-button'>+</button>
                <button onClick={() => {
                    if (tasks.length > 0) {
                        setPowerAnimation(!powerAnimation)
                        return setPower(!power)
                    }
                    }} className={powerAnimation ? 'power-button-clicked power-button' : 'power-button'}></button>
                </div>
                <div className='tasks-wrapper'>
                {/* All Tasks Displayed */}
                
                {listOfTasks()}
            </div>
            </div>
        </div>
    )
}

export default LandingPage