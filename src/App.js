// Component Imports

import LandingPage from './LandingPage/LandingPage'
import NewTask from './NewTask/NewTask';
import ViewTask from './ViewTask/ViewTask'

// Dependency Imports

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css';

// Redux Shenanigans


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/new-task" Component={NewTask}/>
          <Route path="/view-task" Component={ViewTask}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
