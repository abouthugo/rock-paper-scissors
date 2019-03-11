import React from 'react';
import styles from './User.module.scss'
import { AppContext } from './Context';

const url = 'https://api.adorable.io/avatars/100/';
const User = ({ user }) => (
    <div className={ styles.container }>
        <AppContext.Consumer>
            { context =>
                <figure className={ styles.figure } onClick={ () => context.sendMatchRequest(user.id) }>
                    <img src={ `${url}${user.name}@gmail.png` } alt="name of the user"/>
                </figure>
            }
        </AppContext.Consumer>
        <p>{ user.name }</p>
    </div>
);

export default User;