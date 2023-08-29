import { useSelector } from "react-redux"
import './ViewTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"
// import { loadState } from "../App"


function ViewTask() {
    const tasks = useSelector((currentState) => currentState.task.tasks)
    console.log(loadState())
    // console.log(tasks)
    // console.log(tasks.value)
    return (
        <div>
            <div>View Task</div>
            {JSON.stringify(loadState())}
            <div>-------</div>
            {JSON.stringify(tasks)}
        </div>
    )
}

export default ViewTask