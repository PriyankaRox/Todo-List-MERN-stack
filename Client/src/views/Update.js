import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import styles from "./back.module.css";

export default (props) => {
  const { id } = props;
  const [title, setTitle] = useState("");
  const [category, setCat] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    //gets the task that we are updating
    axios.get("http://localhost:8000/api/task/" + id).then((res) => {
      setTitle(res.data.title);
      setCat(res.data.category);
      setDue(res.data.due);
      setPriority(res.data.priority);
    });
  }, []);

  const updateTask = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/tasks/" + id + "/update", {
        title,
        category,
        due,
        priority 
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
      <h1 className={styles.h1}> Update your Task </h1>

      <form onSubmit={updateTask}>
        <p>
          <label className={styles.text}>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <label className={styles.text}>Category</label>
          <br />
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => {
              setCat(e.target.value);
            }}
          />
        </p>
        <p>
          <label className={styles.text}>Due Date</label> <br />
          <input
            type="date"
            name="due"
            value={due}
            onChange={(e) => {
              setDue(e.target.value);
            }}
          />
        </p>
        <p>
          <label className={styles.text}>Priority</label>
          <br />
          <select onChange={(e) => setPriority(e.target.value)}>
              <option value="1Low">1.Low</option>
              <option value="2Medium">2.Medium</option>
              <option value="3High">3.High</option>
            </select>
          {/* <input
            type="text"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          /> */}
        </p>
        <div>
          
            <Link to={"/"} className={styles.btn}>Cancel</Link>
          
          <div style={{width: "4px", height: "auto", display: "inline-block"}}></div>
          <button className={styles.btn} type="submit" value="Edit task">
            Update
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
