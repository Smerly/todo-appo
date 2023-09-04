import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/reducer.ts";
import { useNavigate, Link } from "react-router-dom";
import './NewTask.css'


function NewTask() {
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

    // Initialize Redux
    const dispatch = useDispatch()
    
    // Helper Vars
    const symbolsEnd = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`', ' ', '.' ]
    const symbols = ['%', '{' , '}', '|', '^' , '~' , '[' , '\\', ']', '\`' ]
    const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // Helper Methods
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
                return true
            } else {
                return false
            }
        }
        return false
    }
    return (
        <div className='new-task-wrapper' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Link to={`/`} className='back-arrow'></Link>

            {/* Title */}

            <h1>New Task</h1>
            <div className='task-box-new'>
                <div className='dashed-decoration-new'>
                    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20, marginBottom: 100}}>
                        <h1> Enter Task Title </h1>
                        <input className='input-text' style={{height: 40, fontSize: 20, width: '20vw'}} type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
                        
                        <div className='radio-section'>

                        {/* Priority */}

                        <h1>How Much Priority Will This Task Take?</h1>
                            <div className='radio-buttons'>
                            {optionsArr.map((each, i) => {
                                return (
                                    <div key={i} className='radio-div'>
                                        <label style={{textAlign: 'center'}}>{each}</label>
                                        <input className='radio-button' name='priority' type='radio' value={each} onChange={(e) => setPriority(each)}/>
                                    </div>
                                )
                            })}
                            </div>

                            {/* Complexity */}
                        
                            <h1>How Complex is your Task?</h1>
                            <div className='radio-buttons'>
                            
                            {optionsArr.map((each, i) => {
                                return (
                                    <div key={i} className='radio-div'>
                                        <label style={{textAlign: 'center'}}>{each}</label>
                                        <input className='radio-button' name='complexity' type='radio' value={each} onChange={(e) => setComplexity(each)}/>
                                    </div>  
                                )
                            })}
                            </div>
                        </div>

                        {/* Due Date */}
                        
                        <h1> Due Date </h1>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <input
                            className='input-text'
                            style={{
                                margin: 'auto',
                                width: 200,
                                textAlign: 'center',
                                marginBottom: 100
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

                        <button className='custom-submit' type='submit' onClick={() => {
                        if (hasSymbolsEnd(title)) {
                            alert('Title does not accept those characters at the end (could be a space)')
                        } else if (hasSymbols(title)) {
                            alert('Title has non-accepted symbols')
                        } else {
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
                    }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTask;