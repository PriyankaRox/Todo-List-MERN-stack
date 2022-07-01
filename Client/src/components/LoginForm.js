import React, { useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import styles from "./todoList.module.css";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const [errors, setErrors] = useState([]); //errors

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (email && password) {
        const formData = {
          email: email,
          password: password
        };
        const apiData = await axios.post(
          "http://localhost:8000/api/login",
          formData
        );
        console.log(apiData);
        setFormStatus(apiData.data.message);
        if (
          apiData.status === 200 &&
          apiData.data.message === "User login successful"
        ) {
          console.log(
            "login successfull",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("Invalid Email or Password");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
        <form onSubmit={onSubmitHandler}>
          {errors.map((err, index) => {
            return (
              <p style={{ color: "red" }} key={index}>
                {err}
              </p>
            );
          })}
          <h1 className={styles.h1}>Login</h1>
          <p>
            <label className={styles.text}>Email</label>
            <br />
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </p>
          <p>
            <label className={styles.text}>Password</label>
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </p>

          <input type="submit" value="login" className={styles.btn}/>
        </form>
          <br/><i>Don't have an account?{" "}</i> 
        <Link to={"/register"} style={{color:"black"}} className={styles.text}> Register</Link>
        <br/><br/>
      </div>
    </div>
  );
};
