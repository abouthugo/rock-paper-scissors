import React from 'react';
import styles from './Waiting.module.scss';

const WaitingAnimation = () => (
    <div className={styles['waiting-container']}>
        Waiting for player to confirm
        <div className={styles['animation-container']}>

        </div>
    </div>
);

export default WaitingAnimation;