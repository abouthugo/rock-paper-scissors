import React, { Component } from 'react';
import User from './components/User';
import UserList from './components/UserList';

class App extends Component {
    render() {
        return (
           <>
               <p>Welcome Players</p>
               <UserList>
                   <User username="Hugo Perdomo"/>
                   <User username="Luis Quiroz"/>
                   <User username="Tyler Harriott"/>
                   <User username="Abdul Khalique"/>
               </UserList>
           </>
        );
    }
}

export default App;
