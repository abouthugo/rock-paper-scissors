import React, { Component } from 'react';
import io from 'socket.io-client';

const AppContext = React.createContext();

class AppContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            start: false,
            registered: false,
            user: {},
            players: [],
            cards: [],
            choice: 1,
        };
    }

    componentDidMount() {
        this.setState({
            cards: randomCards()
        });
    }

    setPlayerName = (player_name) => {
        this.setState({
            user: {
                name: player_name,
                available: true
            },
            registered: true
        });
        setTimeout(this.connectUser, 200);
    };

    /**
     * Set up socket connection, executed after user picks an username
     */
    connectUser = () => {
        this.socket = io(process.env.REACT_APP_Socket);
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            this.socket.emit("leave", {});
        });

        // Get the id
        this.socket.on("id", ({id}) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    id
                }
            }));
        });

        // get who is connected
        this.socket.on('entering', ({ players }) => {
            this.setState({ players });
        });

        // listen for connections
        this.socket.on("connected", ({user}) => {
            console.log("connected Called");
            console.log(user);
            this.setState(prevState => ({
               players: [...prevState.players, user]
            }));
        });

        // Send connection message
        this.socket.emit("connected", {user: this.state.user})
    };

    /**
     * Starts the timer
     */
    handleStart = () => {
        this.setState({ start: true });
        console.log("Started")
    };

    /**
     * Resets the timer
     */
    handleReset = () => {
        this.setState({ start: false, cards: randomCards(), choice: 1 });
        console.log("Reset");
    };

    /**
     * Adds a class to card that has been clicked
     * @param id
     */
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


    render() {
        return (
            <AppContext.Provider
                value={ {
                    state: this.state,
                    handleStart: this.handleStart,
                    handleReset: this.handleReset,
                    handleCardClick: this.handleCardClick,
                    setPlayerName: this.setPlayerName,
                } }
            >
                { this.props.children }
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

export { AppContext, AppContextProvider }