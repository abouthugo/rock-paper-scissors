import React, {Component} from 'react'
import styled from 'styled-components';


const TimeMessage = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  color: blue;
  font-size: 2.6rem;
  grid-area: timer;
  margin: 10px;
  padding: 10px;
`;

export default class Timer extends Component{

    constructor(){
        super();
        this.state = {
            done: false,
            remaining: 10
        };
        this.intervalHandle = null;
    }

    componentDidMount(){
       this.intervalHandle = setInterval(this.tick, 1000)
    }

    tick = () => {
        if(this.state.remaining < 2)
            clearInterval(this.intervalHandle);
        this.setState(prevState => ({
            remaining: prevState.remaining-1
        }));
    };


    render(){
        return(
            <TimeMessage>{this.state.remaining}</TimeMessage>
        )
    }

}