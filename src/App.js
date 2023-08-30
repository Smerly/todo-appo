// Component Imports

import LandingPage from './LandingPage/LandingPage'
import NewTask from './NewTask/NewTask';
import ViewTask from './ViewTask/ViewTask';
import EditTask from './EditTask/EditTask';

// Dependency Imports

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css';

// Redux Imports

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';

  // Reducers

  import taskReducer from './Redux/reducers/reducer.ts';
import { logDOM } from '@testing-library/react';

// Redux Shenanigans

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('TASKS_STATE');
    if (serializedState === null) {
      console.log('in loadState, TASK_STATE doesnt exist')
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return 'There was an error while doing loadstate'
  }
}
// console.log(loadState())
// export const saveState = (state) => {
//   try {
//     console.log('saving..')
//     const serializedState = JSON.stringify(state);  

//     if (loadState()) {
//       console.log(loadState().task.tasks)
//       localStorage.setItem('TASKS_STATE', [...loadState().task.tasks, serializedState])
//     } else {
//       localStorage.setItem('TASKS_STATE', [serializedState]);
//     }

//   } catch (err) {
//     console.log(err)
//   }
// }
const persistedState = loadState();
console.log(persistedState)
// console.log(loadState())

const store = configureStore({
  reducer: {
    task: taskReducer
  },
  // preloadedState: persistedState
}
)

// store.subscribe(() => {
//   saveState(store.getState())
// })

function App() {
  return (
    <Provider store={store}>
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/new-task" Component={NewTask}/>
          <Route path="/view-task/:slug" Component={ViewTask}/>
          <Route path="/edit-task/:slug" Component={EditTask}/>
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
