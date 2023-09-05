import { Link } from "react-router-dom"
import './LandingPage.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { update } from "../redux/reducer.ts"

function LandingPage() {
    // Query all tasks from Redux store
    const tasks = useSelector((state) => state.task.tasks)
    // Get dispatch from Redux
    const dispatch = useDispatch()
    
    // useState Vars

    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')

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
         

    // Displaying all tasks

    const listOfTasks = () => {
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
                    console.log(each.done)
                    return (
                        <div key={i}>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${each.title}`} className='task-box-each' style={{textDecoration: 'none'}}>
                                    <h2 className='regular-texted'>{each.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                                    {/* {each.done ? <header style={{margin: 10}}>done</header> : <header style={{margin: 10}}> pending </header>}  */}
                                    {/* { each.done === 'done' ? doneCase(each) : pendingCase(each)} */}
                                    {/* <select onClick={(e) => {
                                        e.preventDefault()
                                    }}
                                    onChange={(e) => {
                                        dispatch(update({
                                            title: each.title,
                                            priority: each.priority,
                                            complexity: each.complexity,
                                            dueDatex: each.dueDatex,
                                            checklist: each.checklist,
                                            tags: each.tags,
                                            originalTitle: each.originalTitle,
                                            done: e.target.value
                                        }))
                                    }}
                                    >

                                    <option value={each.done} onChange={(e) => {
                                        e.preventDefault()
                                    }}>{each.done}</option>
                                    <option value={notCurrentDone(each)} onChange={(e) => {
                                        e.preventDefault()
                                    }}>{notCurrentDone(each)}</option>
                                </select> */}
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
                                    // navigate('/')
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
                <Link to={`/new-task`} className='add-button'>+</Link>
                <div className='tasks-wrapper'>
                {/* All Tasks Displayed */}
                
                {listOfTasks()}
            </div>
            </div>
        </div>
    )
}

export default LandingPage