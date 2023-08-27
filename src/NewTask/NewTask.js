import { useDispatch } from "react-redux";
import { add } from "../Redux/reducers/reducer.ts";
import { useSelector } from "react-redux";


function NewTask() {
    const tasks = useSelector((state) => state.task)
    console.log(tasks)
    const dispatch = useDispatch()
    // payload of action goes into dispatch
    // ex: 
    // dispatch(add({
        // Payload goes here
    // }))
    return (
        <div>
            <div>New Task</div>
            <button onClick={() => {
                dispatch(add({
                    title: "",
                    priority: 1,
                    complexity: 0,
                    dueDatex: '',
                    checklist: [],
                    tags: []
                }))
            }}></button>
        </div>
    )
}

export default NewTask;