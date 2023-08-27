import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interface } from "readline";

interface Task {
    title: String;
    priority: Number,
    complexity: Number,
    dueDatex: String,
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
            
        }
    }
})

export const {add} = taskSlice.actions

export default taskSlice.reducer;

// Payload is an obj to pass in information for changing state. Usually gotten from somewhere else