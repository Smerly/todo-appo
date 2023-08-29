import { Link } from "react-router-dom"
import './LandingPage.css'
import { useSelector } from "react-redux"
import { loadState } from "../App"

function LandingPage() {
    const tasks = useSelector((state) => state.tasks)
    const listOfTasks = () => {
        console.log(loadState())
        if (loadState()) {
                return loadState().map((each) => {
                
                    return (
                        <div className='each-task'>
                            <div>{each.title}</div>
                            <div>{each.priority}</div>
                            <div>{each.complexity}</div>
                            <div>{each.dueDatex}</div>
                            <div>{each.checklist}</div>
                            <div>{each.tags}</div>
                        </div>
                    )
                } )
        } else {
            return (
                <div>nothing here yet.</div>
            )
        }
    }
    // const tasks = useSelector((currentState) => currentState.task)
    // console.log(tasks)
    console.log('in landing page')
    return (
        <div>
            <div>
                <h1>
                    Landing Page
                </h1> 
              
                <Link to={`/view-task`}>ViewTask</Link>
                <Link to={`/new-task`}>NewTask</Link>
                <div className='tasks-wrapper'>
                {listOfTasks()}
                {JSON.stringify(tasks)}
                
            </div>
            </div>
        </div>
    )
}

export default LandingPage