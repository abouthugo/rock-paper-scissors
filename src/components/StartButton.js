import React from 'react';
import styles from './Button.module.scss'
import { AppContext } from './Context';
const StartButton = () => (
    <AppContext.Consumer>
        {context => (
            <button className={styles.btn} onClick={context.handleStart}>Start!</button>
        )}
    </AppContext.Consumer>
);

export default StartButton;