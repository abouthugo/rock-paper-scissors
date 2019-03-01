import React from 'react';
import styles from './User.module.scss'
const url = 'https://api.adorable.io/avatars/100/';
const User = ({username}) => (
  <div className={styles.container}>
      <figure style={{"borderRadius": "120px"}}>
          <img src={`${url}${username}@gmail.png`} alt="name of the user"/>
      </figure>
      <p>{username}</p>
  </div>
);

export default User;