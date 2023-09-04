// Redux Imports
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store, { persistor } from './redux/index.ts'
// Dependency Imports
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css';
// Component Imports
import LandingPage from './LandingPage/LandingPage'
import NewTask from './NewTask/NewTask';
import ViewTask from './ViewTask/ViewTask';
import EditTask from './EditTask/EditTask';


// Redux Shenanigans

  // loadState is promise for getting tasks out of local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('TASKS_STATE');
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return 'There was an error while doing loadstate'
  }
}


function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
