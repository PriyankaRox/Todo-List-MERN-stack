import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import styles from "./todoList.module.css";
import axios from "axios";
import moment from "moment";

const MediumP = () => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/medium").then((res) => {
      setTasks(res.data);
      setLoaded(true);
      console.log(tasks);
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
      <div className={styles.formDisplay}>
      <h1 className={styles.h1}>Medium Priority Tasks</h1>
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
                <td className={styles.Medium}>{task.priority.slice(1,7)}</td>
                <td>
                  <button
                    onClick={(e) => {
                      deleteTask(task._id);
                    }}
                    className={styles.btn}
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

export default MediumP;
