// Component Imports

import LandingPage from './LandingPage/LandingPage'
import NewTask from './NewTask/NewTask';
import ViewTask from './ViewTask/ViewTask'

// Dependency Imports

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css';

// Redux Imports

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';

  // Reducers

  import taskReducer from './Redux/reducers/reducer.ts';

// Redux Shenanigans

const store = configureStore({
  reducer: {
    task: taskReducer
  }
})

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/new-task" Component={NewTask}/>
          <Route path="/view-task" Component={ViewTask}/>
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
