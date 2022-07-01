import React, { useState } from "react";
import axios from "axios";
import styles from "./todoList.module.css";
import { navigate, Link } from "@reach/router";
import moment from "moment";

export default () => {
  const [title, setTitle] = useState("");
  const [category, setCat] = useState("Work");
  const [due, setDue] = useState();
  const [priority, setPriority] = useState("Low");
  const [empty, setempty] = useState(false);
  const [label, setlabel] = useState(false);
  const [emptyCategory, setemptyCategory] = useState(false);
  const [emptyDate, setemptyDate] = useState(false);
  const [errors, setErrors] = useState([]); //errors

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/task/new", {
        title,
        category,
        due,
        priority
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        // const errorResponse = err.response.data.errors;
        // const errorArr = [];
        // for (const key of Object.keys(errorResponse)) {
        //     errorArr.push(errorResponse[key].message)
        // }
        // setErrors(errorArr);
        console.log(err);
      });
  };

  var today = moment().format("dddd, MMM DD");

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
        <h1 className={styles.h1}>Add your Task</h1>

        <form onSubmit={onSubmitHandler}>
          {errors.map((err, index) => {
            return (
              <p style={{ color: "red" }} key={index}>
                {err}
              </p>
            );
          })}
          <p>
            <label className={styles.text}>Task Title</label>
            <br />
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Task Title"
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setempty(false);
                  if (e.target.value.match(/(.*[a-zA-Z0-9]){3}([^0-9]*)$/i)) {
                    console.log("Done");
                    setlabel(false);
                  } else {
                    console.log("Invalid");
                    setlabel(true);
                  }
                } else {
                  setempty(true);
                }
              }}
            />
            {empty == true ? (
              <p style={{ color: "#F1C40F" }}>Please enter the task</p>
            ) : (
              false
            )}
            {label == true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </p>
          <p>
            <label className={styles.text}>Category</label>
            <br />
            <select onChange={(e) => setCat(e.target.value)}
            onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyCategory(false);
                } else {
                  setemptyCategory(true);
                }
              }}>
              <option value="Work">Work</option>
              <option value="Home">Home</option>
              <option value="Finance">Finance</option>
            </select>
            {emptyCategory == true ? (
              <p style={{ color: "#F1C40F" }}>Please enter the Category</p>
            ) : (
              false
            )}
          </p>
          <p>
            <label className={styles.text}>Due date</label>
            <br />
            <input
              type="date"
              min={today}
              onChange={(e) => setDue(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyDate(false);
                } else {
                  setemptyDate(true);
                }
              }}
            />
            {emptyDate == true ? (
              <p style={{ color: "#F1C40F" }}>Please enter the Date</p>
            ) : (
              false
            )}
          </p>
          <p>
            <label className={styles.text}>Priority</label>
            <br />
            <select onChange={(e) => setPriority(e.target.value)}>
              <option>Select</option>
              <option value="1Low">1.Low</option>
              <option value="2Medium">2.Medium</option>
              <option value="3High">3.High</option>
            </select>
            {/* <input type="text" onChange={(e) => setPriority(e.target.value)} /> */}
          </p>

          <input type="submit" value="Add task" className={styles.btn} />
        </form>
      </div>
    </div>
  );
};
