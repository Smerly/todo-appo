import { useSelector, useDispatch } from "react-redux"
import './ViewTask.css'
import { update } from "../redux/reducer.ts"

function Taglist(props) {
    const { currentTask } = props
    const currentDate = JSON.parse(currentTask.dueDatex);
    const tasks = useSelector((state) => state.task.tasks)
    const dispatch = useDispatch()

    const deleteTag = (each) => {
        const updatedTag = currentTask.tags.filter((each2) => each2.id !== each.id)
        dispatch(update({
            title: currentTask.title,
            priority: currentTask.priority,
            complexity: currentTask.complexity,
            dueDatex: currentDate,
            checklist: currentTask.checklist,
            tags: updatedTag,
            originalTitle: currentTask.originalTitle,
            done: currentTask.done
        }))
    }

    if (currentTask.tags.length > 0) {
        return (
            <div className='tags-box'>
                {currentTask.tags.map((each) => {
                    return (
                        <div key={each.id} className='tag-box'>
                            {each.name}
                            <button className='delete-list' onClick={(e) => {
                                deleteTag(each)
                            }}></button>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return <header> No Tags Yet.</header>
    }
}

export default Taglist