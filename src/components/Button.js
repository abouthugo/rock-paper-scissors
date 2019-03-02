import React from 'react';
import styles from './Button.module.scss'
const Button = (props) => (
    <button onClick={props.onClick} className={styles.btn}>{props.children}</button>
);

export default Button;