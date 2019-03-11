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
            user: {}, // Self user object
            players: [], // List of players online
            cards: [], // Set of cards for a given game
            choice: 0, // Default choice of card
            requests: [], // To signal if a request has been received
            outRequest: 'none',
        };
    }

    componentDidMount() {
        this.setState({
            cards: initialCards()
        });
    }

    /**
     * TODO: emit a message to the user that has been clicked
     */
    sendMatchRequest = (id) => {
        this.socket.emit("match", { id });
        // TODO: use this to play a waiting animation until outRequest turns to "fulfilled
        this.setState({ outRequest: 'sent' });
    };

    handleResponse = (req) => window.confirm(`Would you like to start a new battle with ${req.name}`);

    /**
     * Instantiates the user object and sets registered flag on, it then connect the user to the server via socket.
     * @param player_name
     */
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
            this.socket.emit("leave", { id: this.state.user.id });
        });

        // Get the id
        this.socket.on("id", ({ id }) => {
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
        this.socket.on("connected", ({ user }) => {
            this.setState(prevState => ({
                players: [...prevState.players, user]
            }));
        });

        // Listen for when someone leaves
        this.socket.on("leave", ({ id }) => {

            let { players } = this.state;
            let update = players.filter(el => el.id !== id);
            this.setState({
                players: update
            });

        });

        // Get a match request
        this.socket.on("match", ({ sender }) => {
            console.log(`ID: ${sender.id}, sender: ${sender.name}`);
            let answer = this.handleResponse(sender);
            this.socket.emit("confirm", ({ id: sender.id, answer }));
            this.setState({inMatch: answer});
        });

        // Handle confirmations
        this.socket.on("confirm", answer => {
            if (answer)
                this.setState({
                    inMatch: true,
                    outRequest: "accepted"
                });
            else
                this.setState({
                    outRequest: "rejected"
                });
        });

        // Send connection message
        this.socket.emit("connected", { user: this.state.user });
    };

    /**
     * Starts the timer, shows the controls and reveals the cards to the user
     */
    handleStart = () => {
        this.setState({
            start: true,
            cards: randomCards(),
        });

        setTimeout(() => {
            let { cards } = this.state;
            this.setState({
                choice: cards[0].name
            })
        }, 1);
    };

    /**
     * Resets the timer and hides the controls
     */
    handleReset = () => {
        this.setState({
            start: false,
            inMatch: false,
            cards: initialCards(),
            choice: 1
        });
    };

    /**
     * Adds a class to card that has been clicked
     * @param id
     * @param name
     */
    handleCardClick = ({ id, name }) => {
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

/**
 * Returns an array that represents 3 random cards of the set {rock, paper, scissors}
 * @returns {Array}
 */
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

/**
 * Returns an array that represents 3 "rand" cards
 * @returns {Array}
 */
function initialCards() {
    let res = [];
    for (let i = 0; i < 3; i++) {
        res.push({
            name: "rand",
            active: false,
            id: i
        });
    }
    return res;
}

export { AppContext, AppContextProvider }