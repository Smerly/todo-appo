import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../Redux/reducers/reducer.ts";
import { useSelector } from "react-redux";
import './NewTask.css'


function NewTask() {
    // useStates Variables
    
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState(0)
    const [complexity, setComplexity] = useState(0)
    const [dueDate, setDueDate] = useState(0)
    const [checklist, setChecklist] = useState([]);
    const [tags, setTags] = useState([])
    

    const tasks = useSelector((state) => state.task)
    console.log(tasks)
    const dispatch = useDispatch()
    console.log(priority)

    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 10]
    return (
        <div>
            <div>New Task</div>
            <form>
                <input type='text' placeholder='title'/>

                {optionsArr.map((each) => {
                    return (
                        <div>
                            <label>{each}</label>
                            <input name='priority' type='radio' value={each} onClick={(e) => {
                                setPriority(e)
                            }}/>
                        </div>
                    )
                })}
                
                {optionsArr.map((each) => {
                    return (
                        <div>
                            <label>{each}</label>
                            <input name='priority' type='radio' value={each}/>
                        </div>  
                    )
                })}
            </form>
            <button onClick={() => {
                dispatch(add({
                    title: "",
                    priority: 1,
                    complexity: 0,
                    dueDatex: 0,
                    checklist: [],
                    tags: []
                }))
            }}></button>
        </div>
    )
}

export default NewTask;