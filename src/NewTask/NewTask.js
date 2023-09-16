import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/reducer.ts";
import { useNavigate, Link } from "react-router-dom";
import './NewTask.css'


// Helper Vars
const symbolsEnd = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', ' ', '.' ]
const symbols = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', '!', '@', '#', "$", "^", "&", "*" ]
const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function NewTask() {
    // Query tasks
    const tasks = useSelector((state) => state.task.tasks)
    // Initialize React useNavigate()
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

    const [checklistIdCount, setChecklistIdCounter] = useState(0)
    const [tagIdCount, setTagIdCount] = useState(0)

    // Initialize Redux
    const dispatch = useDispatch()
    
    // Helper Methods
    const hasSymbols = (letitle) => {
        // For every character in string, if there are symbols, then throw error
        for (let i = 0; i < letitle.length; i++) {
            if (symbols.includes(letitle[i])) {
                return true
            }
        }
        return false
    }

    const hasSymbolsEnd = (letitle) => {
        if (symbolsEnd.includes(letitle[letitle.length - 1])) {
            return true
        }
        return false
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

    const createTask = () => {
        dispatch(add({
            title: title,
            priority: priority,
            complexity: complexity,
            dueDatex: JSON.stringify(dueDate),
            checklist: checklist,
            tags: tags,
            originalTitle: title,
            done: false
        }))
        return navigate('/') 
    }

    const handleSubmit = () => {
        const existedArr = tasks.filter((each) => {
            return each.title === title
        })
        if (existedArr.length > 0) {
            alert('This title already exists')
            return false
        } else if (hasSymbolsEnd(title)) {
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

    // Render
    return (
        <div className='new-task-wrapper'>
            <Link to={`/`} className='back-arrow'></Link>
            <div className='task-box-new'>
                {/* Title */}
                <h1>New Task</h1>
                <div className='dashed-decoration-new'>
                    <form className="new-task-form">
                        <h1> Enter Task Title </h1>
                        <input className='title-input input-text' type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
                        <div className='radio-section'>
                            {/* Priority */}
                            <h1>How Much Priority Will This Task Take?</h1>
                            <div className='radio-buttons'>
                            {optionsArr.map((each) => {
                                return (
                                    <div key={each.id} className='radio-div'>
                                        <label className='radio-label'>{each}</label>
                                        <input className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                    </div>
                                )
                            })}
                            </div>

                            {/* Complexity */}
                        
                            <h1>How Complex is your Task?</h1>
                            <div className='radio-buttons'>
                            
                            {optionsArr.map((each) => {
                                return (
                                    <div key={each.id} className='radio-div'>
                                        <label className="radio-label">{each}</label>
                                        <input className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                    </div>  
                                )
                            })}
                            </div>
                        </div>

                        {/* Due Date */}
                        
                        <h1> Due Date </h1>
                        <div className='date-items-box'>
                            <input
                                className='date-input input-text'
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
                                    <div key={each.id} className='tag-box'>
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
                                <button className='button-margin custom-button'  onClick={(e) => {
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
                            createTask()
                        }
                    }}>Create Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTask;