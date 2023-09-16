import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
// import { useParams, useNavigate, Link } from "react-router-dom"
import { update } from "../redux/reducer.ts"
import { useParams } from "react-router-dom"
import { current } from "@reduxjs/toolkit"


function Checklist (props) {
    const { currentTask } = props
    const currentDate = JSON.parse(currentTask.dueDatex);
    const tasks = useSelector((state) => state.task.tasks)
    const dispatch = useDispatch()
    

    // const currentTask = tasks.filter(() => )
    if (currentTask.checklist.length > 0) {
        return (
            <div className='checklist-box'>
                {currentTask.checklist.map((each) => {
                    return (
                        <div key={each.id} className={each.done ? 'crossed-out list-item-box' : 'list-item-box'}>
                            {each.name}
                            <button className={each.done ? 'undo done-list' : 'done-list'} onClick={(e) => {
                                let updatedChecklist = {}
                                updatedChecklist = currentTask.checklist.map((eachIn) => {
                                    if (eachIn.id !== each.id) {
                                        return eachIn
                                    }
                                    return {id: each.id, name: each.name, done: !each.done}
                                })
                                dispatch(update({
                                    title: currentTask.title,
                                    priority: currentTask.priority,
                                    complexity: currentTask.complexity,
                                    dueDatex: currentDate,
                                    checklist: updatedChecklist,
                                    tags: currentTask.tags,
                                    originalTitle: currentTask.originalTitle,
                                    done: currentTask.done
                                }))
                            }}></button>
                            <button className='delete-list' onClick={(e) => {
                                // Delete checklist item
                                const updatedChecklist = currentTask.checklist.filter((eachIn) => eachIn.id !== each.id)
                                dispatch(update({
                                    title: currentTask.title,
                                    priority: currentTask.priority,
                                    complexity: currentTask.complexity,
                                    dueDatex: currentDate,
                                    checklist: updatedChecklist,
                                    tags: currentTask.tags,
                                    originalTitle: currentTask.originalTitle,
                                    done: currentTask.done
                                }))
                            }}></button>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return <header>No Checklist Items yet.</header>
    }
}

export default Checklist