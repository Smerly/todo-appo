import { useSelector } from "react-redux"


function ViewTask() {
    const tasks = useSelector((currentState) => currentState.task)
    console.log(tasks)
    // console.log(tasks.value)
    return (
        <div>
            <div>View Task</div>
        </div>
    )
}

export default ViewTask