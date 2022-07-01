import React, { useState } from 'react'
import { navigate, Link } from '@reach/router';
import axios from "axios"
import styles from "./todoList.module.css";

export default () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [formStatus, setFormStatus] = useState("");


    const [errors, setErrors] = useState([]); //errors


    const onSubmitHandler =async(e) => {
        try {
            e.preventDefault();
            if (fname && email && password && conPassword) {
              const formData = {
                name:fname,
                email: email,
                password: password,
                confirmPassword: conPassword,
              };
              const apiData = await axios.post(
                "http://localhost:8000/api/register",
                formData
              );
              console.log(apiData);
              setFormStatus(apiData.data.message);
              if (
                apiData.status === 200 &&
                apiData.data.message === "User regsiter successful"
              ) {
                console.log(
                  "regsiter successfull",
                  apiData.data.token,
                  apiData.data.user
                );
                localStorage.setItem("token", apiData.data.token);
                localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
                navigate("/login");
              }
            }
          } catch (err) {
            setFormStatus("Invalid");
          }  
    }

    return (
        <div className={styles.background}>
            <div className={styles.formDisplay}>
            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => {
                    return (
                        <p style={{ color: "red" }} key={index}>{err}</p>
                    )
                })}
                <h1 className={styles.h1}>Register</h1>
                <p>
                    <label className={styles.text}>Name</label><br />
                    <input type="text" onChange={(e) => setFname(e.target.value)} />
                </p>
           
                <p>
                    <label className={styles.text}>Email</label><br />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label className={styles.text}>Password</label><br />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <label className={styles.text}>Confirm Password</label><br />
                    <input type="password" onChange={(e) => setConPassword(e.target.value)} />
                </p>

                <input type="submit" value="Register" className={styles.btn}/>
            </form>
            <br/><i>Already have an account?{" "}</i> 
            <Link to={'/login'} style={{color:"black"}} className={styles.text}>SignUp</Link>
            <br/><br/>
            </div>
        </div>
    )
}