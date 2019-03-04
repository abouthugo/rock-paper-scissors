import React from 'react';
import styles from './User.module.scss'
import { AppContext } from './Context';

const url = 'https://api.adorable.io/avatars/100/';
const User = ({ username }) => (
    <div className={ styles.container }>
        <AppContext.Consumer>
            { context =>
                <figure className={ styles.figure } onClick={ context.sendMatchRequest }>
                    <img src={ `${url}${username}@gmail.png` } alt="name of the user"/>
                </figure>
            }
        </AppContext.Consumer>

        <p>{ username }</p>
    </div>
);

export default User;