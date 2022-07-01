import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import styles from "./todoList.module.css";
import axios from "axios";
import moment from "moment";

const HighP = () => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/high").then((res) => {
      setTasks(res.data);
      setLoaded(true);
    });
  }, []);

  const deleteTask = (taskID) => {
    axios
      .delete("http://localhost:8000/api/task/" + taskID + "/delete")
      .then((res) => {
        console.log(res);
      });
    window.location.reload(true);
  };

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay} >
      <h1 className={styles.h1}>High Priority Taks</h1>
      <table>
        <tr>
          <th className={styles.text}>Task Title</th>
          <th className={styles.text}>Due Date</th>
          <th className={styles.text}>Priority Level</th>
          <th className={styles.text}></th>
        </tr>
        {tasks.map((task, idx) => {
          var inputDate = task.due;
          var outputDate = moment(inputDate).format("dddd, MMM DD");
          return (
            <>
              <tr key={idx}>
                <td className={styles.tbtext}>
                  <Link
                    to={"/tasks/" + task._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {task.title}
                  </Link>
                </td>
                <td className={styles.tbtext}>{outputDate}</td>
                <td className={styles.High}>{task.priority.slice(1,5)}</td>
                <td>
                  <button
                  className={styles.btn}
                    onClick={(e) => {
                      deleteTask(task._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
      </div>
    </div>
  );
};

export default HighP;
