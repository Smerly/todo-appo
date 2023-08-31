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
                        <div>
                            <div className='button-overlay' />
                            <Link to={`/view-task/${each.title}`} className='task-box-each' style={{textDecoration: 'none'}}>
        
                                    <h2 className='regular-texted'>{each.title}</h2>
                                    <header className='regular-texted'>Priority Level: ({each.priority}/10)</header>
                                    <header className='regular-texted'>Complexity Level: ({each.complexity}/10)</header>
                                    <div className='regular-texted'>{`${new Date(each.dueDatex).getMonth()+1}/${new Date(each.dueDatex).getDate()}/${new Date(each.dueDatex).getFullYear()}`}</div>
                                
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
    // const tasks = useSelector((currentState) => currentState.task)
    // console.log(tasks)
    console.log('in landing page')
    
    return (
        <div>
            <div className='landing-page-wrap'>
                <h1>
                    Tasks
                </h1> 
                
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