import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './EditTask.css'
import { useParams, useNavigate, Link } from "react-router-dom"
import { update } from "../redux/reducer.ts"

const symbolsEnd = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', ' ', '.' ]
const symbols = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', '!', '@', '#', "$", "^", "&", "*" ]
const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function EditTask() {
    // Getting slug from parameters
    const slug = useParams().slug

    // Redux methods Initializations
    const tasks = useSelector((state) => state.task.tasks)

    // Query the task we need to use
    const currentTask = tasks.filter((each) => {
        return each.title === slug
    })[0]

    const getChecklistIdPlace = () => {
        if (currentTask.checklist.length > 0) {
            return currentTask.checklist[currentTask.checklist.length - 1].id
        }
        return 0
    }
    const getTagIdPlace = () => {
        if (currentTask.tags.length > 0 ) {
            return currentTask.tags[currentTask.tags.length - 1].id
        }
        return 0
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useState Vars

    const [title, setTitle] = useState(currentTask.title)
    const [priority, setPriority] = useState(currentTask.priority)
    const [complexity, setComplexity] = useState(currentTask.complexity)
    const [dueDate, setDueDate] = useState(new Date(JSON.parse(currentTask.dueDatex)).getTime())

    const [checklist, setChecklist] = useState(currentTask.checklist);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState(currentTask.tags)
    const [eachTag, setEachTag] = useState('')

    const [checklistIdCount, setChecklistIdCounter] = useState(getChecklistIdPlace() + 1)
    const [tagIdCount, setTagIdCount] = useState(getTagIdPlace() + 1)

    // Helper functions

    // Helper function for checking if the title has symbols we don't allow
    const hasSymbols = (letitle) => {
        for (let i = 0; i < letitle.length; i++) {
            if (symbols.includes(letitle[i])) {
                return true
            }
        }
        return false
    }
    // Helper function for checking if the end of the title has symbols we don't allow
    const hasSymbolsEnd = (letitle) => {
        if (symbolsEnd.includes(letitle[letitle.length - 1])) {
            return true
        }
        return false
    }

    // Function for returning an extra 0 to numbers below 10. Ex: 4 > 04
    const returnZero = (num) => {
        if (num < 10) {
            return '0' + String(num)
        } else {
            return String(num)
        }
    }

    const handleSubmit = () => {
        if (hasSymbolsEnd(title)) {
            alert('Title does not accept those characters at the end (could be a space)')
            return false
        } else if (hasSymbols(title)) {
            alert('Title has non-accepted symbols')
            return false
        } else if (title.length === 0) {
            alert('Title has to at least have one letter or number')
            return false
        } else {
            return true
        }
    }

    const generatedId = (counter, arr, type) => {
        const tempArr = arr
        if (type === 'tag') {
            setTagIdCount(counter + 1)
        } else if (type === 'checklist') {
            setChecklistIdCounter(counter + 1)
        }
        return counter + tempArr.length / 100000
    }

    const updateTask = () => {
        dispatch(update({
            title: title,
            priority: priority,
            complexity: complexity,
            dueDatex: dueDate,
            checklist: checklist,
            tags: tags,
            originalTitle: currentTask.originalTitle,
            done: currentTask.done
        }))
    }

    const addChecklistItem = (oldArr, item) => {
        const eachName = item.split(',')
        let tempArr = []
        const newArr = eachName.map((each) => {
            tempArr.push('counted')
            return {id: generatedId(checklistIdCount, tempArr, 'checklist'), name: each, done: false}
        })
        return [...oldArr, ...newArr]  
    }

    const addTag = (oldArr, tag) => {
        const eachName = tag.split(',')
        let tempArr = []
        const newArr = eachName.map((each) => {
            tempArr.push('counted')
            return {id: generatedId(tagIdCount, tempArr, 'tag'), name: each}
        })
        return [...oldArr, ...newArr]  
    }

    const currentDate = JSON.parse(currentTask.dueDatex)

    // Vars for being able to display the date and time
    const year = new Date(currentDate).getFullYear()
    const day = returnZero(new Date(currentDate).getDate())
    const month = returnZero(new Date(currentDate).getMonth()+1)
    const hour = returnZero(new Date(currentDate).getHours())
    const minute = returnZero(new Date(currentDate).getMinutes())
    const second = returnZero(new Date(currentDate).getSeconds())
    const millisecond = returnZero(new Date(currentDate).getMilliseconds())

    const defaultDate = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`
    return (
        <div className='new-task-wrapper'>
            <Link to={`/`} className='back-arrow'></Link>
            
            {/* Title */}

            <div className='task-box-new'>
                <h1> {currentTask.title} </h1>
                <div className='dashed-decoration-new'>
                    <form className="new-task-form">
                        <h1> Task Title </h1>
                        <input className='title-input input-text' defaultValue={currentTask.title} type='text' onChange={(e) => setTitle(e.target.value)}/>
                        
                        <div className='radio-section'>

                        {/* Priority */}

                        <h1>How Much Priority Will This Task Take?</h1>
                        <div className='radio-buttons'>
                            {optionsArr.map((each) => {
                                if (priority === each){
                                    return (
                                        <div key={each.id} className='radio-div'>
                                            <label className="radio-label">{each}</label>
                                            <input checked={true} className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={each.id} className='radio-div'>
                                            <label className="radio-label">{each}</label>
                                            <input className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                        </div>
                                    )
                                }
                                
                            })}
                            </div>

                            {/* Complexity */}
                        
                            <h1>How Complex is your Task?</h1>
                            <div className='radio-buttons'>
                            
                            {optionsArr.map((each) => {
                                if (complexity === each) {
                                    return (
                                        <div key={each.id} className='radio-div'>
                                            <label className="radio-label">{each}</label>
                                            <input checked={true} className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                        </div>  
                                    )
                                } else {
                                    return (
                                        <div key={each.id} className='radio-div'>
                                            <label className="radio-label">{each}</label>
                                            <input className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                        </div>  
                                    )
                                }
                                
                            })}
                            </div>
                        </div>

                        {/* Due Date */}
                        
                        <h1> Due Date </h1>
                        <div className="date-items-box">
                        <input
                            className='date-input input-text'
                            defaultValue={defaultDate}
                            type="datetime-local"
                            onChange={(e) => {
                                setDueDate(new Date(e.target.value).getTime())
                            }}
                        />
                        {/* Checklist */}
                                
                        <div className='checklist-box'>
                            {checklist.map((each) => {
                            return (
                                <div key={each.id} className='list-item-box'>
                                    {each.name}
                                    <button className='delete-list' onClick={(e) => {
                                    e.preventDefault()
                                    setChecklist(checklist.filter((each2) => each2.id !== each.id ))
                                    }}></button>
                                </div>
                                
                            )
                            })}
                        </div>
                        <form className='array-form'>
                            <input className='input-text' type='text' value={eachListItem} onChange={(e) => setEachListItem(e.target.value)}/>
                            <button className='button-margin custom-button' onClick={(e) => {
                                e.preventDefault();
                                setEachListItem('')
                                return setChecklist((oldArr) => {
                                    const newChecklist = addChecklistItem(oldArr, eachListItem)
                                    return newChecklist
                                })
                            }}>Enter Checklist Item</button>
                        </form>
                        
                        {/* Tags */}
                                <div className='spacer'></div>  
                                {tags.map((each) => {
                                return (
                                    <div className='tag-box'>
                                        {each.name}
                                        <button className='delete-list' onClick={(e) => {
                                            e.preventDefault()
                                            setTags(tags.filter((each2) => each2.id !== each.id ))
                                        }}></button>
                                    </div>
                                )
                            })} 
                            <form className='array-form'>
                                <input className='input-text' type='text' value={eachTag}  onChange={(e) => {
                                    setEachTag(e.target.value)
                                }}/>
                                <button className='button-margin custom-button' onClick={(e) => {
                                    e.preventDefault();
                                    setEachTag('')
                                    return setTags((oldArr) => { 
                                        const newTags = addTag(oldArr, eachTag)
                                        return newTags
                                    })
                                }}>Enter Tag</button>
                            </form>
                            
                        </div>

                        {/* Submit Button */}
                        <button className='custom-submit' type='submit' onClick={(e) => {
                            e.preventDefault()
                            if (handleSubmit()) {
                                updateTask()
                                return navigate('/') 
                            }

                    }}>Save</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EditTask;