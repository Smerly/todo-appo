

// Tasks

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const EDIT_TASK = 'EDIT_TASK'
export const LOAD_TASK = 'LOAD_TASK'

export const addTask = (index) => {
    return {
        type: ADD_TASK,
        payload: { index },
    }
}

// Tags

export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'
export const EDIT_TAG = 'EDIT_TAG'
export const LOAD_TAG = 'LOAD_TAG'


