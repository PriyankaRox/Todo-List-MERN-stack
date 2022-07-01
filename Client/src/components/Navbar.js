import React from 'react';
import { navigate, Link } from '@reach/router';
import styles from './Navbar.module.css';

function Navbar() {
  
  return (
    <div className={styles.background}>
        <div>
            <h1 className={styles.title}>Welcome to Todo List</h1>
        </div>
      
    </div>
  );
}

export default Navbar;