import { Link, useNavigate } from "react-router-dom"
import './LandingPage.css'
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { update } from "../redux/reducer.ts"
import PowerOnTasks from "./PowerOnTask"
import Tasks from "./Tasks"

function LandingPage() {
    // Query all tasks from Redux store
    const tasks = useSelector((state) => state.task.tasks)
    // Init useNavigate()
    const navigate = useNavigate()
    
    // useState Vars

    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')
    const [sortTag, setSortTag] = useState('')
    const [power, setPower] = useState(false)
    const [powerAnimation, setPowerAnimation] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

    // Helper Functions

    // Check if task has tag for filter
    const tagsHas = (input, target) => {
        const targettedTag = input.tags.find((each) => each.name === target)
        return targettedTag ? true : false
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
    
    // Displaying all tasks

    const renderTasks = () => {
        // Display for if power button is pressed
        if (power && tasks.length > 0) {
            return <PowerOnTasks />
        } else if (tasks.length > 0) {
            // Display without power button
            // This occurs when the power button is off and tasks has at least 1 item
            return <Tasks searchFilter={searchFilter} sortTag={sortTag} sort={sort}/>
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
                {renderTasks()}
            </div>
            </div>
        </div>
    )
}

export default LandingPage