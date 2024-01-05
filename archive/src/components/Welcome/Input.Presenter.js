import React from 'react';
import styles from './Input.module.scss';
const InputPresenter = ({handleChange, value }) => (
    <input
        className={styles.input}
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Username"/>
);

export default InputPresenter;