import React, {Component} from 'react'
import styled from 'styled-components';


const TimeMessage = styled.div`
  display: block;
  width: ${props => props.percentage};
  text-align: center;
  color: ${props => props.color};
  font-size: 2.6rem;
  grid-area: timer;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background: ${props => props.background ? props.background: "blue"};
  cursor: ${props => props.cursor ? props.cursor : null};
  transition: all .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

export default class Timer extends Component{

    constructor(props){
        super(props);
        this.state = {
            done: false,
            remaining: 5,
            start: false
        };
        this.intervalHandle = null;
    }

    componentDidMount() {
        let { start } = this.props;
        this.setState({start})
    }


    componentDidUpdate(prevProps){
        let {start} = this.props;
        if(start !== prevProps.start && start !== this.state.start)
            this.intervalHandle = setInterval(this.tick, 1000);
    }

    tick = () => {
        console.log("Ticking");
        if(this.state.remaining < 2)
            clearInterval(this.intervalHandle);
        this.setState(prevState => ({
            remaining: prevState.remaining-1
        }));
    };

    handleClick = () => {
        this.setState({remaining: 5, start: false});
        this.props.handleReset();
    };


    render(){
        let {remaining} = this.state;
        let percentage;
        if(remaining !== 0)
            percentage = remaining * 20;
        else percentage = 1;
        return(
            <TimeMessage
                percentage={`${percentage}%`}
                color={remaining === 0 ? "blue": "white"}
                background={remaining === 0 ? "white": null}
                cursor={remaining === 0 ? "pointer": null}
                onClick={remaining === 0 ? this.handleClick : null}
            >{remaining!==0 ? remaining: "Reset"}</TimeMessage>

        )
    }

}