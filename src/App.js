import React, { Component } from 'react';
import AppContainer from './components/AppContainer';
import UserList from './components/UserList';

import User from './components/User';
import CardContainer from './components/Card.Container';
import Timer from './components/Timer';
import StartButton from './components/StartButton';

class App extends Component {
    render() {
        return (
           <AppContainer>
               <p style={{"gridArea": "title", "fontSize": "2.6rem"}}>Welcome Players</p>
               <UserList>
                   <User username="Hugo Perdomo"/>
                   <User username="Tyler Harriott"/>
                   <User username="Abdul Khalique"/>
                   <User username="Luis Quiroz"/>
               </UserList>
               <Timer/>
               <StartButton/>
               <CardContainer/>
           </AppContainer>
        );
    }
}

export default App;
