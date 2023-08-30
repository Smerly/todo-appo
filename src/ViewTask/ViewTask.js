import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"
import { useParams, useNavigate, Link } from "react-router-dom"
import { update } from "../Redux/reducers/reducer.ts"

function ViewTask() {
    const slug = useParams().slug
    console.log(slug)

    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [dueDate, setDueDate] = useState(new Date().getTime())

    const [checklist, setChecklist] = useState([]);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState([])
    const [eachTag, setEachTag] = useState('')
    
    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 10]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentTask = () => {
        for (let i = 0; i < loadState().length; i++) {
            if (loadState()[i].title === slug) {
                return loadState()[i]
            }
        }
    }
    console.log(currentTask())
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Link to={`/`} className='back-arrow'></Link>
            <h1>Task Details</h1>
            
            <div className='task-box'>
                <div className='dashed-decoration'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h1 className='box-text' style={{ marginRight: 'auto'}}>{currentTask().title}</h1>
                        <Link to={`/edit-task/${currentTask().title}`} className='edit-icon'></Link>
                        <Link className='delete-icon'>X</Link>
                    </div>
                    <h3>Priority: {currentTask().priority}</h3>
                    <h3>Complexity: {currentTask().complexity}</h3>
                    <h3>Checklist:</h3>
                    <div className='checklist-box'>
                    {currentTask().checklist.map((each) => {
                        return (
                            <div className='list-item-box'>{each}</div>
                        )
                    })}

                    
                    </div>
                    <h2> Tags </h2>
                    <div className='tags-box'>
                   
                    {currentTask().tags.map((each) => {
                        return (
                            <div className='tag-box'>{each}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ViewTask