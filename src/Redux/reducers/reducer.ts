import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Interface } from "readline";
import { loadState } from "../../App";

interface Task {
    title: string;
    priority: Number,
    complexity: Number,
    dueDatex: Number,
    checklist: Array<string>,
    tags: Array<string>,
}

interface TaskSliceState {
    tasks: Task[];
}

const initialState: TaskSliceState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: "task",
    // Basically "model":
    initialState,
    // initialState: {
    //     tasks: {
    //         taskList: [

    //         ]
    //         // title: "",
    //         // priority: 0,
    //         // complexity: 0,
    //         // dueDatex: new Date(),
    //         // checklist: [],
    //         // tags: []
    //     }
    // },
    
    // Reducers (functions for altering stuffs)
    reducers: {
        // Always takes 2 args; the current state holds the current or previous information on the "object"
        // The action is obj with new information that I might want to use to change the currentState
        // ex: action's attribute payload (action.payload) might have new data to replace the currentState's
        add: (currentState, action: PayloadAction<Task>) => {
            // replace current information with new information
            currentState.tasks = [...currentState.tasks, action.payload]
            // console.log(loadState())
            if (loadState()) {
                console.log('loadstate exists in reducer')
                // console.log(loadState())
                // localStorage.setItem('TASKS_STATE', JSON.stringify([...loadState(), ...currentState.tasks]))
                localStorage.setItem('TASKS_STATE', JSON.stringify([...loadState(), action.payload]))

                // localStorage.setItem('TASKS_STATE', JSON.stringify([...loadState()]))

            } else {
                console.log('loadstate DOESNT exists in reducer')
                console.log(loadState())
                localStorage.setItem('TASKS_STATE', JSON.stringify(currentState.tasks))
            }
            
            
        },
        update: (currentState, action: PayloadAction<Task>) => {
            const title: string = action.payload.title
            // Query the targetted task from the array of tasks by title, then change the state with the new state
            currentState.tasks = loadState()
            for (let i = 0; i < currentState.tasks.length; i++) {
                if (currentState.tasks[i].title === title) {
                    currentState.tasks[i] = action.payload
                    localStorage.setItem('TASKS_STATE', JSON.stringify(currentState.tasks))
                }
            }
        },
        delete: (currentState, action: PayloadAction<Task>) => {
            const title: string = action.payload.title
            currentState.tasks = loadState()
            for (let i = 0; i < currentState.tasks.length; i++) {
                if (currentState.tasks[i].title === title) {
                    currentState.tasks.splice(i, 1)
                    localStorage.setItem('TASKS_STATE', JSON.stringify(currentState.tasks))
                }
            }
        }
    }
})

export const {add} = taskSlice.actions

export default taskSlice.reducer;

// Payload is an obj to pass in information for changing state. Usually gotten from somewhere else