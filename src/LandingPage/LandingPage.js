import { Link } from "react-router-dom"
import './LandingPage.css'
import { useSelector } from "react-redux"
import { useState } from "react"

function LandingPage() {
    // Query all tasks from Redux store
    const tasks = useSelector((state) => state.task.tasks)
    
    // useState Vars

    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')

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
                    return (
                        <div key={i}>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${each.title}`} className='task-box-each' style={{textDecoration: 'none'}}>
                                    <h2 className='regular-texted'>{each.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(currentDate).getMonth()+1}/${new Date(currentDate).getDate()}/${new Date(currentDate).getFullYear()}`},  {`${new Date(currentDate).toLocaleTimeString()}`}</div>
                                    {each.done ? <header style={{margin: 10}}>done</header> : <header style={{margin: 10}}> pending </header>} 
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

                <input type='text' className='input-text' onChange={(e) => setSearchFilter(e.target.value)}/>
                <div>

                    {/* Sorter Options */}

                    <form>
                        <select className="custom-select" onChange={(e) => {
                            setSort(e.target.value)
                        }}>
                            <option value='default'>Default</option>
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