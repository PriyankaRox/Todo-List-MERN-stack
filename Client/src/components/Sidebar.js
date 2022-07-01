import React , {useState,useEffect}from 'react';
import styles from "./Sidebar.module.css";
import { Link, navigate } from "@reach/router";

function Sidebar() {

  return (
    <div className={styles.background}>
      <div className={styles.back}>
        <div className={styles.newHalf}>
          <div className={styles.addButtonBox}>
            <div className={styles.NewTask}>
              <Link className={styles.text} to={"/tasks/new"}>
                New Task
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.topHalf}>
          <div className={styles.buttonBox}>
            <div className={styles.AllTasks}>
              <Link className={styles.text} to={"/"}>
                All Tasks
              </Link>
            </div>
          </div>

          <div className={styles.buttonBox}>
            <div className={styles.HighP}>
              <Link className={styles.text} to={"/task/high"}>
                High Priority
              </Link>
            </div>
          </div>

          <div className={styles.buttonBox}>
            <div className={styles.MedP}>
              <Link className={styles.text} to={"/task/medium"}>
                Medium Priority
              </Link>
            </div>
          </div>

          <div className={styles.buttonBox}>
            <div className={styles.LowP}>
              <Link className={styles.text} to={"/task/low"}>
                Low Priority
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomHalf}>
          <div className={styles.buttonBox2}>
            <div className={styles.AllTasks}>
              <Link className={styles.text} to={"/task/today"}>
                {" "}
                Due Today{" "}
              </Link>
            </div>
          </div>

          <div className={styles.buttonBox2}>
            <div className={styles.AllTasks}>
              <Link className={styles.text} to={"/task/done"}>
                {" "}
                Done Tasks{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
