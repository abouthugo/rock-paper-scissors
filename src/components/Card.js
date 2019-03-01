import React from 'react';
import styles from './Card.module.scss';

const Card = ({ card, handleClick}) => {
    let kind;
    if(card.active)
        kind = `${card.name}x`;
    else kind = card.name;
    return <div className={styles[kind]} onClick={handleClick} />;
};

export default Card;
