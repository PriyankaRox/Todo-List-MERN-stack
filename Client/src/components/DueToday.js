import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import styles from './todoList.module.css';
import axios from 'axios';
import moment from 'moment';


export default () => {

    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks')
            .then(res => {
                setTasks(res.data);
                setLoaded(true);
            });
    }, [])

    const deleteTask = (taskID) => {
        axios.delete('http://localhost:8000/api/task/' + taskID + '/delete')
            .then(res => {
                console.log(res);
            })
        window.location.reload(true)
    }

    var today = moment().format("dddd, MMM DD")


    return (
        <div className={styles.background}>
            <div className={styles.formDisplay}>

            <h1 className={styles.h1}>Today's Task</h1>
             <p className={styles.tbtext}>{today}</p>
            <table>
                <tr>
                    <th className={styles.text}>Task Title</th>
                    <th className={styles.text}>Due Date</th>
                    <th className={styles.text}>Priority Level</th>
                    <th></th>
                </tr>
                {tasks.map((task, idx) => {
                    var inputDate = task.due;
                    var outputDate = moment(inputDate).format("dddd, MMM DD");
                    var today = moment().format("dddd, MMM DD")
                    if (outputDate == today) {
                        if (task.priority == '3High')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td className={styles.tbtext}><Link to={"/tasks/" + task._id} style={{textDecoration:"none", color:"black"}}>{task.title}</Link></td>
                                        <td className={styles.tbtext}>{outputDate}</td>
                                        <td className={styles.High}>{task.priority.slice(1,5)}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }} className={styles.btn}>Delete</button></td>
                                    </tr>
                                </>
                            )
                        if (task.priority == '2Medium')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td className={styles.tbtext}><Link to={"/tasks/" + task._id} style={{textDecoration:"none", color:"black"}}>{task.title}</Link></td>
                                        <td className={styles.tbtext}>{outputDate}</td>
                                        <td className={styles.Medium}>{task.priority.slice(1,7)}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }} className={styles.btn}>Delete</button></td>
                                    </tr>
                                </>
                            )
                        if (task.priority == '1Low')
                            return (
                                <>
                                    <tr key={idx}>
                                        <td className={styles.tbtext}><Link to={"/tasks/" + task._id} style={{textDecoration:"none", color:"black"}}>{task.title}</Link></td>
                                        <td className={styles.tbtext}>{outputDate}</td>
                                        <td className={styles.Low}>{task.priority.slice(1,4)}</td>
                                        <td><button onClick={(e) => { deleteTask(task._id) }} className={styles.btn}>Delete</button></td>
                                    </tr>
                                </>
                            )
                    }
                    // return (
                    //     <>
                    //     <tr key={idx}>
                    //         <td><Link to={"/tasks/" + task._id}>{task.title}</Link></td>
                    //         <td>{outputDate}</td>
                    //         <td className={styles.High}>{task.priority}</td>
                    //     </tr>
                    //     </>
                    // )
                })}
            </table>
            </div>
        </div>
    )
}