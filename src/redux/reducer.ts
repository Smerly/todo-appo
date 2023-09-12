import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChecklistItems {
    id: Number,
    name: string,
    done: boolean
}

interface Tag {
    id: Number,
    name: string
}
interface Task {
    title: string;
    priority: Number,
    complexity: Number,
    dueDatex: Number,
    checklist: Array<ChecklistItems>,
    tags: Array<Tag>,
    originalTitle: string,
    done: boolean
}

interface TaskSliceState {
    tasks: Task[];
}

const initialState: TaskSliceState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    // Reducers (functions for altering stuffs)
    reducers: {
        // Always takes 2 args; the current state holds the current or previous information on the "object"
        // The action is obj with new information that I might want to use to change the currentState
        // ex: action's attribute payload (action.payload) might have new data to replace the currentState's
        add: (currentState, action: PayloadAction<Task>) => {
            // replace current information with new information
            currentState.tasks = [...currentState.tasks, action.payload]   
        },
        update: (currentState, action: PayloadAction<Task>) => {
            // Query the targetted task from the array of tasks by title, then change the state with the new state
            const title: string = action.payload.originalTitle
            for (let i = 0; i < currentState.tasks.length; i++) {
                if (currentState.tasks[i].title === title) {
                    currentState.tasks[i] = action.payload
                    currentState.tasks[i].originalTitle = currentState.tasks[i].title
                }
            }
        },
        remove: (currentState, action: PayloadAction<Task>) => {
            const title: string = action.payload.title
            for (let i = 0; i < currentState.tasks.length; i++) {
                if (currentState.tasks[i].title === title) {
                    currentState.tasks.splice(i, 1)
                }
            }
            
        }
}})

export const { add, update, remove } = taskSlice.actions

export default taskSlice.reducer;

// Payload is an obj to pass in information for changing state. Usually gotten from somewhere else