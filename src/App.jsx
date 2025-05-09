import {Route, Routes} from 'react-router-dom'
import './index.css'
import AddTask from './components/AddTask';
import Sidebar from './components/Sidebar';
import AllTasks from './components/AllTasks';
import CompleteTask from './components/CompleteTask';
import InProgressTask from './components/InProgressTask';
import Dashboard from './components/Dashboard';
import PendingTask from './components/PendingTask';
import Deployed from './components/Deployed';
import Deferred from './components/Deferred';
import './App.css'
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {loadTasks} from "./store/taskSlice.js";


const App = () => {
    const dispatch = useDispatch();
    const fetchTasks = async () => {
        const {data} = await axios.get(
            "https://681cdcc7f74de1d219ae0b87.mockapi.io/tasks/Task"
        );
        dispatch(loadTasks(data));
    }
    useEffect(() => {
        fetchTasks();
    }, []);
  return (

    <div className='flex h-full'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/allTask" element={<AllTasks />} />
        <Route path="/completeTask" element={<CompleteTask />} />
        {/* <Route path="/pendingTask" element={<PendingTask />} />
        <Route path="/deployedTask" element={<Deployed />} />
        <Route path="/deferredTask" element={<Deferred />} /> */}
        <Route path="/inProgressTask" element={<InProgressTask />} />
        <Route path="/statsTask" element={<Dashboard />} />
      </Routes>
    </div>

  );
};

export default App;

// cloned