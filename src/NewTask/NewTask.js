import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { add } from "../Redux/reducers/reducer.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './NewTask.css'


function NewTask() {

    const navigate = useNavigate()

    // useStates Variables
    
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [dueDate, setDueDate] = useState(new Date().getTime())

    const [checklist, setChecklist] = useState([]);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState([])
    const [eachTag, setEachTag] = useState('')

    const tasks = useSelector((currentState) => currentState.task.tasks)
    // console.log(tasks)
    const dispatch = useDispatch()
    

    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 10]
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>New Task</div>
            <form>
                {title}
                <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>

                <h1> {priority} </h1>
                {optionsArr.map((each, i) => {
                    return (
                        <div key={i}>
                            <label>{each}</label>
                            <input name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                        </div>
                    )
                })}
              
                <h1>{complexity}</h1>
                {optionsArr.map((each, i) => {
                    return (
                        <div key={i}>
                            <label>{each}</label>
                            <input name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                        </div>  
                    )
                })}
                {dueDate}
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    onChange={(e) => {
                        setDueDate(new Date(e.target.value).getTime())
                    }}
                />
                {checklist.length}
                {checklist.map((each, i) => {
                    return (
                        <div key={i}>{each}</div>
                    )
                })}
                <input type='text' className='temp-margin' onChange={(e) => setEachListItem(e.target.value)}/>
                <button className='temp-margin' onClick={(e) => {
                    e.preventDefault();
                    return setChecklist((oldArr) => [...oldArr, eachListItem])
                }}>Enter Checklist Item</button>

                {tags}
                <input type='text' className='temp-margin' onChange={(e) => setEachTag(e.target.value)}/>
                <button className='temp-margin' onClick={(e) => {
                    e.preventDefault();
                    return setTags((oldArr) => [...oldArr, eachTag])
                }}>Enter Tag</button>
                
                </div>

                
            </form>
            <button onClick={() => {
                dispatch(add({
                    title: title,
                    priority: priority,
                    complexity: complexity,
                    dueDatex: dueDate,
                    checklist: checklist,
                    tags: tags
                }))
                return navigate('/')
            }}>Submit</button>
        </div>
    )
}

export default NewTask;