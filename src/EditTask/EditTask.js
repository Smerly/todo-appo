import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './EditTask.css'
import { useParams, useNavigate, Link } from "react-router-dom"
import { update } from "../redux/reducer.ts"

function ViewTask() {
    // Getting slug from parameters
    const slug = useParams().slug

    // Redux methods Initializations
    const tasks = useSelector((state) => state.task.tasks)

    // Query the task we need to use
    const currentTask = tasks.filter((each) => {
        return each.title === slug
    })[0]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useState Vars

    const [title, setTitle] = useState(currentTask.title)
    const [priority, setPriority] = useState(currentTask.priority)
    const [complexity, setComplexity] = useState(currentTask.complexity)
    const [dueDate, setDueDate] = useState(new Date(currentTask.dueDatex).getTime())

    const [checklist, setChecklist] = useState(currentTask.checklist);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState(currentTask.tags)
    const [eachTag, setEachTag] = useState('')

    // Helper functions

    const symbolsEnd = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', ' ', '.' ]
    const symbols = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`' ]
    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
        for (let i = letitle.length-1; i > 0; i--) {
            if (symbolsEnd.includes(letitle[i])) {
                return true
            } else {
                return false
            }
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
        <div className='new-task-wrapper' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <Link to={`/`} className='back-arrow'></Link>

            <h1> Edit Task </h1>
            
            {/* Title */}

            <div className='task-box-new' style={{ width: '50vw' }}>
                <div className='dashed-decoration-new'>
                    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20, marginBottom: 100}}>
                        <h1> Task Title </h1>
                        <input className='input-text' defaultValue={currentTask.title} style={{height: 40, fontSize: 20, width: '20vw'}} type='text' onChange={(e) => setTitle(e.target.value)}/>
                        
                        <div className='radio-section'>

                        {/* Priority */}

                        <h1>How Much Priority Will This Task Take?</h1>
                        <div className='radio-buttons'>
                            {optionsArr.map((each, i) => {
                                if (priority === each){
                                    return (
                                        <div key={i} className='radio-div'>
                                            <label style={{textAlign: 'center'}}>{each}</label>
                                            <input checked={true} className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={i} className='radio-div'>
                                            <label style={{textAlign: 'center'}}>{each}</label>
                                            <input className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                        </div>
                                    )
                                }
                                
                            })}
                            </div>

                            {/* Complexity */}
                        
                            <h1>How Complex is your Task?</h1>
                            <div className='radio-buttons'>
                            
                            {optionsArr.map((each, i) => {
                                if (complexity === each) {
                                    return (
                                        <div key={i} className='radio-div'>
                                            <label style={{textAlign: 'center'}}>{each}</label>
                                            <input checked={true} className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                        </div>  
                                    )
                                } else {
                                    return (
                                        <div key={i} className='radio-div'>
                                            <label style={{textAlign: 'center'}}>{each}</label>
                                            <input className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                        </div>  
                                    )
                                }
                                
                            })}
                            </div>
                        </div>

                        {/* Due Date */}
                        
                        <h1> Due Date </h1>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <input
                            className='input-text'
                            defaultValue={defaultDate}
                            style={{
                                margin: 'auto',
                                width: 200,
                                textAlign: 'center',
                                marginBottom: 100,
                            }}
                            type="datetime-local"
                            onChange={(e) => {
                                setDueDate(new Date(e.target.value).getTime())
                            }}
                        />

                        {/* Checklist */}

                        <div className='checklist-box' style={{margin: 10}}>
                            {checklist.map((each) => {
                            return (
                                <div className='list-item-box'>{each}</div>
                            )
                            })}
                        </div>

                        <input className='input-text' type='text' onChange={(e) => setEachListItem(e.target.value)}/>
                        <button className='custom-button' style={{marginTop: 20, marginBottom: 20}} onClick={(e) => {
                            e.preventDefault();
                            return setChecklist((oldArr) => [...oldArr, eachListItem])
                        }}>Enter Checklist Item</button>

                        {/* Tags */}
                        <div style={{marginTop: '5vw'}}></div>  
                            {tags.map((each) => {
                            return (
                                <div className='tag-box'>{each}</div>
                            )
                        })}
                        <input className='input-text' type='text'  onChange={(e) => setEachTag(e.target.value)}/>
                        <button className='custom-button' style={{marginTop: 20, marginBottom: 20}} onClick={(e) => {
                            e.preventDefault();
                            return setTags((oldArr) => [...oldArr, eachTag])
                        }}>Enter Tag</button>

                        
                        </div>

                        {/* Submit Button */}
                        <button className='custom-submit' type='submit' onClick={() => {
                            // Checking for edge case of faulty title
                            if (hasSymbolsEnd(title)) {
                                alert('Title does not accept those characters at the end (could be a space)')
                            } else if (hasSymbols(title)) {
                                alert('Title has non-accepted symbols')
                            } else {
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
                                return navigate('/')
                            }

                    }}>Submit</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ViewTask