import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';

export default () => {
    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/tasks')
            .then(res=>{
                setTasks(res.data);
                setLoaded(true);
            });
    },[])

    const removeFromDom = tasksID => {
        setTasks(tasks.filter(tasks => tasks._id != tasksID));
    }

    return (
        <div>
           {loaded && <TodoList tasks={tasks} removeFromDom={removeFromDom}/>}
        </div>
    )
}