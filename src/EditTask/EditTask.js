import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import './EditTask.css'
import { current } from "@reduxjs/toolkit"
import { loadState } from "../App"
import { useParams, useNavigate, Link } from "react-router-dom"
import { update } from "../Redux/reducers/reducer.ts"

function ViewTask() {
    const slug = useParams().slug
    console.log(slug)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function containsWhitespace(str) {
        return /\s/.test(str);
    }

    const currentTask = () => {
        for (let i = 0; i < loadState().length; i++) {
            if (loadState()[i].title === slug) {
                return loadState()[i]
            }
        }
    }

    const [title, setTitle] = useState(currentTask().title)
    const [priority, setPriority] = useState(currentTask().priority)
    const [complexity, setComplexity] = useState(currentTask().complexity)
    const [dueDate, setDueDate] = useState(new Date(currentTask().dueDatex))

    const [checklist, setChecklist] = useState(currentTask().checklist);
    const [eachListItem, setEachListItem] = useState('')
    const [tags, setTags] = useState(currentTask().tags)
    const [eachTag, setEachTag] = useState('')

    const symbolsEnd = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', ' ', '.' ]
    const symbols = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`' ]
    const hasSymbols = (letitle) => {
        for (let i = 0; i < letitle.length; i++) {
            if (symbols.includes(letitle[i])) {
                return true
            }
        }
        return false
    }

    const hasSymbolsEnd = (letitle) => {
        for (let i = letitle.length-1; i > 0; i--) {
            if (symbolsEnd.includes(letitle[i])) {
                console.log(letitle[i])
                return true
            } else {
                return false
            }
        }
        return false
    }

    const returnZero = (num) => {
        if (num < 10) {
            return '0' + String(num)
        } else {
            return String(num)
        }
    }
    // 2015-1-2T11:42:13.510'
    const year = new Date(currentTask().dueDatex).getFullYear()
    const day = returnZero(new Date(currentTask().dueDatex).getDay())
    const month = returnZero(new Date(currentTask().dueDatex).getMonth()+1)
    const hour = returnZero(new Date(currentTask().dueDatex).getHours())
    const minute = returnZero(new Date(currentTask().dueDatex).getMinutes())
    const second = returnZero(new Date(currentTask().dueDatex).getSeconds())
    const millisecond = returnZero(new Date(currentTask().dueDatex).getMilliseconds())

    const defaultDate = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`
    console.log(defaultDate)
    
    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 10]
    console.log(currentTask())
    return (
        <div className='new-task-wrapper' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <Link to={`/`} className='back-arrow'></Link>

            <h1> Edit Task </h1>
            
            {/* Title */}

            <div className='task-box-new' style={{ width: '50vw' }}>
                <div className='dashed-decoration-new'>
                    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20, marginBottom: 100}}>
                        <h1> Task Title </h1>
                        <input className='input-text' placeholder={currentTask().title} style={{height: 40, fontSize: 20, width: '20vw'}} type='text' onChange={(e) => setTitle(e.target.value)}/>
                        
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
                            // defaultValue='2015-01-02T11:42:13.510'
                                        //   2023-03-08T17:57.00
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

                        <div className='checklist-box'>
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

                        <div className='checklist-box'>
                            {tags.map((each) => {
                            return (
                                <div className='list-item-box'>{each}</div>
                            )
                        })}
                        </div>
                        <input className='input-text' type='text'  onChange={(e) => setEachTag(e.target.value)}/>
                        <button className='custom-button' style={{marginTop: 20, marginBottom: 20}} onClick={(e) => {
                            e.preventDefault();
                            return setTags((oldArr) => [...oldArr, eachTag])
                        }}>Enter Tag</button>
                        
                        </div>

                        <button className='custom-submit' type='submit' onClick={() => {

                            if (hasSymbolsEnd(title)) {
                                alert('Title does not accept those characters at the end (could be a space)')
                            } else if (hasSymbols(title)) {
                                alert('Title has non-accepted symbols')
                            } else {
                                dispatch(update({
                                    title: title,
                                    priority: priority,
                                    complexity: complexity,
                                    dueDatex: Number(dueDate),
                                    checklist: checklist,
                                    tags: tags,
                                    originalTitle: currentTask().originalTitle
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