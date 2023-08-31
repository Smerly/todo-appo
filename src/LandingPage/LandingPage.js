import { Link } from "react-router-dom"
import './LandingPage.css'
import { useSelector, useDispatch } from "react-redux"
import { loadState } from "../App"
import { useState } from "react"
import { update } from "../Redux/reducers/reducer.ts"

function LandingPage() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks)
    const [searchFilter, setSearchFilter] = useState('')
    const [sort, setSort] = useState('default')
    const listOfTasks = () => {
        console.log(loadState())
        if (loadState()) {
                return loadState().filter((input) => {
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
                        console.log('sort by priority')
                        return a.priority - b.priority
                    } else if (sort === 'priorityHigh') {
                        return b.priority - a.priority
                    } else if (sort === 'complexityLow') {
                        return a.complexity - b.complexity
                    } else if (sort === 'complexityHigh') {
                        return b.complexity - a.complexity
                    }
                }).map((each) => {
                    return (
                        <div>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${each.title}`} className='task-box-each' style={{textDecoration: 'none'}}>
        
                                    <h2 className='regular-texted'>{each.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(each.dueDatex).getMonth()+1}/${new Date(each.dueDatex).getDate()}/${new Date(each.dueDatex).getFullYear()}`}</div>
                                    {each.done ? <header style={{margin: 10}}>done</header> : <header style={{margin: 10}}> pending </header>}
                                    {/* <button className='button-custom' onClick={() => {
                                        dispatch(update({
                                            title: each.title,
                                            priority: each.priority,
                                            complexity: each.complexity,
                                            dueDatex: Number(each.dueDate),
                                            checklist: each.checklist,
                                            tags: each.tags,
                                            originalTitle: each.originalTitle,
                                            done: !each.done
                                        }))
                                    }}> done </button> */}
                                
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
    console.log(sort)
    return (
        <div>
            <div className='landing-page-wrap'>
                <h1>
                    Tasks
                </h1> 
                <input type='text' className='input-text' onChange={(e) => setSearchFilter(e.target.value)}/>
                <div>
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
                <Link to={`/new-task`} className='add-button'>
                    {/* <div className="add-button-static"/> */}
                +</Link>
                {/* <Link>NewTask</Link> */}
                <div className='tasks-wrapper'>
                {listOfTasks()}
            </div>
            </div>
        </div>
    )
}

export default LandingPage