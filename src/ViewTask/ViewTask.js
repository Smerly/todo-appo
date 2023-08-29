import { useSelector } from "react-redux"
import './ViewTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"

function ViewTask() {
    return (
        <div>
            <div>View Task</div>
            <div className='tasks-wrapper'>
            {loadState().map((each) => {
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
            })}
            </div>
            
            
        </div>
    )
}

export default ViewTask