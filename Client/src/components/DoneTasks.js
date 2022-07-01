import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import styles from "./todoList.module.css";
import axios from "axios";
import moment from "moment";

export default () => {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/done").then((res) => {
      setTasks(res.data);
      setLoaded(true);
    });
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
        <h1 className={styles.h1}>Done Tasks</h1>
        <table>
          <tr>
            <th className={styles.text}>Done</th>
            <th className={styles.text}>Task Title</th>
            <th className={styles.text}>Due Date</th>
            <th className={styles.text}>Priority Level</th>
          </tr>
          {tasks.map((task, idx) => {
            var inputDate = task.due;
            var outputDate = moment(inputDate).format("dddd, MMM DD");
            if (task.priority == "3High")
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.tbtext}>
                      <input type={"checkbox"} />
                    </td>
                    <td className={styles.tbtext}>
                      <Link to={"/tasks/" + task._id} style={{ textDecoration: "none", color: "black" }}>{task.title}</Link>
                    </td>
                    <td className={styles.tbtext}>{outputDate}</td>
                    <td className={styles.High}>{task.priority.slice(1, 5)}</td>
                  </tr>
                </>
              );
            if (task.priority == "2Medium")
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.tbtext}>
                      <input type={"checkbox"} />
                    </td>
                    <td className={styles.tbtext}>
                      <Link to={"/tasks/" + task._id} style={{ textDecoration: "none", color: "black" }}>{task.title}</Link>
                    </td>
                    <td className={styles.tbtext}>{outputDate}</td>
                    <td className={styles.Medium}>
                      {task.priority.slice(1, 7)}
                    </td>
                  </tr>
                </>
              );
            if (task.priority == "1Low")
              return (
                <>
                  <tr key={idx}>
                    <td className={styles.tbtext}>
                      <input type={"checkbox"} />
                    </td>
                    <td className={styles.tbtext}>
                      <Link to={"/tasks/" + task._id} style={{ textDecoration: "none", color: "black" }}>{task.title}</Link>
                    </td>
                    <td className={styles.tbtext}>{outputDate}</td>
                    <td className={styles.Low}>{task.priority.slice(1, 4)}</td>
                  </tr>
                </>
              );
          })}
        </table>
      </div>
    </div>
  );
};
