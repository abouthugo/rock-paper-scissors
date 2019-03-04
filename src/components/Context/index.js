import React, { Component } from 'react';
import io from 'socket.io-client';

const AppContext = React.createContext();

class AppContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            start: false, // This is for the timer
            registered: false, // This is for the initial login
            inMatch: false, // Signals whether user is in a match or not
            user: {},
            players: [],
            cards: [],
            choice: 0,
        };
    }

    componentDidMount() {
        this.setState({
            cards: initialCards()
        });
    }

    sendMatchRequest = () => {
        // TODO: emit a message to the user that has been clicked
        this.setState({inMatch: true});
    };

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
        this.socket = io("/");
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            this.socket.emit("leave", {id: this.state.user.id});
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

        // Listen for when someone leaves
        this.socket.on("leave", ({id}) => {

            let {players} = this.state;
            let update = players.filter(el => el.id !== id);
            this.setState({
                players: update
            });

        });

        // Send connection message
        this.socket.emit("connected", {user: this.state.user});

        setTimeout(()=> console.log(this.state), 1000);
    };

    /**
     * Starts the timer
     */
    handleStart = () => {
        this.setState({
            start: true,
            cards: randomCards(),
        });

        setTimeout(() => {
            let {cards} = this.state;
            this.setState({
                choice: cards[0].name
            })
        }, 10);
        console.log("Started")
    };

    /**
     * Resets the timer
     */
    handleReset = () => {
        this.setState({
            start: false,
            inMatch: false,
            cards: initialCards(),
            choice: 1 });
        console.log("Reset");
    };

    /**
     * Adds a class to card that has been clicked
     * @param id
     * @param name
     */
    handleCardClick = ({id, name}) => {
        let { cards } = this.state;
        let newcards = cards.map(card => {
            if (card.id === id) {
                return { name: card.name, active: true, id: card.id }
            } else
                return { name: card.name, active: false, id: card.id }
        });
        this.setState({ cards: newcards, choice: name });
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
                    sendMatchRequest: this.sendMatchRequest
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

function initialCards(){
    let res = [];
    for(let i =0; i < 3; i ++){
        res.push({
            name: "rand",
            active: false,
            id: i
        });
    }
    return res;
}

export { AppContext, AppContextProvider }