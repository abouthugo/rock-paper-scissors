import React, {Component} from 'react';

const AppContext = React.createContext();

class AppContextProvider extends Component {

    constructor(){
        super();
        this.state = {
            start: false,
            cards: [],
            choice: 1
        }
    }

    componentDidMount(){
        this.setState({
            cards: randomCards()
        });
    }

    handleStart = () => {
        this.setState({start: true});
        console.log("Started")
    };

    handleReset = () => {
        this.setState({start: false, cards: randomCards(), choice: 1});
        console.log("Reset");
    };

    handleCardClick = (id) => {
        let { cards } = this.state;
        let newcards = cards.map(card => {
            if (card.id === id) {
                return { name: card.name, active: true, id: card.id }
            } else
                return { name: card.name, active: false, id: card.id }
        });
        this.setState({ cards: newcards, choice: id });
    };


    render(){
        return(
            <AppContext.Provider
                value={{
                    state: this.state,
                    handleStart: this.handleStart,
                    handleReset: this.handleReset,
                    handleCardClick: this.handleCardClick
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }

}
function randomCards() {
    let choices = ["rock", "paper", "scissors"];
    let res = [];
    for (let i in choices) {
        let n = Math.floor(Math.random() * 3);
        res.push({
            name: choices[n],
            active: false,
            id: i
        });
    }
    return res;
}

export {AppContext, AppContextProvider}