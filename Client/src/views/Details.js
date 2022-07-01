import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import styles from "./back.module.css";
import moment from "moment";

export default (props) => {
  const [task, setTasks] = useState({});
  const [done, setDone] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/task/" + props.id)
      .then((res) => setTasks(res.data));
  }, []);

  const doneTask = (taskID) => {
      axios.put('http://localhost:8000/api/tasks/' + taskID + '/updateDone',{
        done:true
      })
          .then(res => {
              console.log(res);
              navigate('/')
          })
  }

  const editTask = (taskID) => {
    navigate("/tasks/" + task._id + "/edit");
  };

  var inputDate = task.due;
  var outputDate = moment(inputDate).format("dddd, MMM DD");

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
        <h2 className={styles.text}>Details about: {task.title} Task</h2>
        {/* <button onClick={(e) => { deleteTask(task._id) }}> Completed </button> */}
        <p className={styles.tbtext}>
          <b>Due Date : </b> {outputDate}
        </p>
        <p className={styles.tbtext}>
          <b>Priority : </b> {task.priority}
        </p>
        <p className={styles.tbtext}>
          <b>Category : </b> {task.category}
        </p>
        <div>
        <button
            onClick={(e) => {
              doneTask(task._id);
            }}
            className={styles.btn}
            value="true"
          >
            Completed
          </button>
          <div
            style={{ width: "4px", height: "auto", display: "inline-block" }}
          ></div>
          <button
            onClick={(e) => {
              editTask(task._id);
            }}
            className={styles.btn}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
