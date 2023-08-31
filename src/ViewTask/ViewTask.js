import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"
import { useParams, useNavigate, Link } from "react-router-dom"
import { remove } from "../Redux/reducers/reducer.ts"

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
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function containsWhitespace(str) {
        return /\s/.test(str);
    }

    const ridOfSpaceAfter = (arr) => {
        let tempRemoveAmount = 0;
        for (let i = arr.length; i > 0; i--) {
            if (containsWhitespace(arr[i])) {
                console.log(arr.slice(0, i))
                return arr.slice(0, i)
            } else {
                tempRemoveAmount++
            }
        }
    }

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
                        <button onClick={() => {
                            dispatch(remove({
                                title: currentTask().title,
                                priority: currentTask().priority,
                                complexity: currentTask().complexity,
                                dueDatex: Number(currentTask().dueDate),
                                checklist: currentTask().checklist,
                                tags: currentTask().tags,
                                originalTitle: currentTask().title
                            }))
                            navigate('/')
                        }} className='delete-icon'>X</button>
                    </div>
                    <header>Due {`${monthsArr[new Date(currentTask().dueDatex).getMonth()]} ${new Date(currentTask().dueDatex).getDate()}, ${new Date(currentTask().dueDatex).getFullYear()}`}</header>
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