import React, { Component } from 'react'
import io from 'socket.io-client'

const AppContext = React.createContext()

class AppContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            start: false, // This is for the timer
            registered: false, // This is for the initial login
            inMatch: false, // Signals whether user is in a match or not
            user: {}, // Self user object
            players: [], // List of players online
            choice: null, // Default choice of card
            requests: [], // To signal if a request has been received
            outRequest: 'none',
            background: '#FFFFFF',
            title_message: '',
            opponent: null,
        }
    }

    /**
     * Sends a request for a match to a player
     */
    sendMatchRequest = (id) => {
        this.opponent = id
        this.socket.emit('match', { id })
        this.setState({ outRequest: 'sent' })
    }

    handleResponse = (req) =>
        window.confirm(`Would you like to start a new battle with ${req.name}`)

    handleLogic = (myChoice, opponent) => {
        console.log(`Testing for ${myChoice} vs ${opponent}`)
        if (myChoice === 'paper') {
            if (opponent === 'rock') return 1
            else if (opponent === 'scissors') return -1
            else return 0
        } else if (myChoice === 'rock') {
            if (opponent === 'scissors') return 1
            else if (opponent === 'paper') return -1
            else return 0
        } else {
            if (opponent === 'paper') return 1
            else if (opponent === 'rock') return -1
            else return 0
        }
    }

    /**
     * Instantiates the user object and sets registered flag on, it then connects the user to the server via socket.
     * @param player_name
     */
    setPlayerName = (player_name) => {
        this.setState(
            {
                user: {
                    name: player_name,
                    available: true,
                },
                registered: true,
                title_message: `Welcome ${player_name}`,
            },
            () => this.connectUser(),
        )
    }

    toggleAvailable() {
        const { user } = this.state
        const update = { ...user }
        update.available = !update.available
        this.setState(
            {
                user: update,
            },
            () => {
                this.socket.emit('update', { user: update })
            },
        )
    }

    /**
     * Set up socket connection, executed after user picks an username
     */
    connectUser = () => {
        this.socket = io('/')
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault()
            this.socket.emit('leave', { id: this.state.user.id })
        })

        // Get the id
        this.socket.on('id', ({ id }) => {
            this.setState((prevState) => ({
                user: {
                    ...prevState.user,
                    id,
                },
            }))
        })

        // get who is connected
        this.socket.on('entering', ({ players }) => {
            this.setState({ players })
        })

        // listen for connections
        this.socket.on('connected', ({ user }) => {
            this.setState((prevState) => ({
                players: [...prevState.players, user],
            }))
        })

        // Listen for when someone leaves
        this.socket.on('leave', ({ id }) => {
            let { players } = this.state
            let update = players.filter((el) => el.id !== id)
            this.setState({
                players: update,
            })
        })

        // Get a match request
        this.socket.on('match', ({ sender }) => {
            let answer = this.handleResponse(sender)
            this.socket.emit('confirm', { id: sender.id, answer })
            if (answer) {
                this.opponent = sender.id
                this.setState(
                    {
                        inMatch: true,
                        title_message: 'Rock, Paper, Scissors !!',
                    },
                    () => {
                        this.toggleAvailable()
                        this.handleStart() // start game right away
                    },
                )
            } else {
                this.setState({ inMatch: false })
            }
        })

        // Handle confirmations
        this.socket.on('confirm', ({ answer }) => {
            if (answer) {
                this.setState(
                    {
                        inMatch: true,
                        outRequest: 'accepted',
                        title_message: 'Rock, Paper, Scissors !!',
                    },
                    () => {
                        this.toggleAvailable()
                        this.handleStart() // start game right away
                    },
                )
            } else {
                this.opponent = null
                this.setState({
                    outRequest: 'rejected',
                    title_message: 'your request has been rejected',
                    background: 'tomato',
                })

                setTimeout(() => {
                    this.setState({
                        title_message: 'Challenge someone else!',
                        background: '#FFFFFF',
                    })
                }, 2500)
            }
        })

        this.socket.on('choice', ({ choice }) => {
            // Moment of truth, this is where the logic for the game happens
            this.setState({ opponent: choice }, () => {
                let myChoice = this.state.choice
                let results = this.handleLogic(myChoice, choice)
                console.log(`Test finished with ${results}`)
                switch (results) {
                    case 1:
                        this.setState({
                            title_message: '🎉🎉You win!🎉🎉',
                            background: 'palegreen',
                        })
                        break
                    case -1:
                        this.setState({
                            title_message: 'Sorry, try again later? 😵',
                            background: '#B04040',
                        })
                        break
                    case 0:
                        this.setState({
                            title_message: 'Its a draw! 😱',
                            background: '#a5b9ff',
                        })
                        break
                    default:
                        break
                }
            })
        })

        // Listen for user updates
        this.socket.on('update', ({ user }) => {
            const { players } = this.state
            const update = players.map((player) => {
                if (player.id === user.id) {
                    // perform update
                    return { ...user }
                }
                return player
            })

            this.setState({
                players: update,
            })
        })

        // Send connection message
        this.socket.emit('connected', { user: this.state.user })
    }

    /**
     * Starts the timer, shows the controls and reveals the cards to the user
     */
    handleStart = () => {
        this.setState({
            start: true,
        })
    }

    /**
     * Resets the timer and hides the controls
     */
    handleReset = () => {
        this.toggleAvailable()
        this.opponent = null
        this.setState({
            start: false,
            inMatch: false,
            choice: null,
            title_message: '',
            background: '#FFFFFF',
            opponent: null,
        })
    }

    // gets triggered when the timer is done
    timerDone = () => {
        this.socket.emit('choice', {
            to: this.opponent,
            choice: this.state.choice,
        })
    }

    updateChoice = (choice) => {
        this.setState({ choice })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    handleStart: this.handleStart,
                    handleReset: this.handleReset,
                    setPlayerName: this.setPlayerName,
                    sendMatchRequest: this.sendMatchRequest,
                    timerDone: this.timerDone,
                    updateChoice: this.updateChoice,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export { AppContext, AppContextProvider }
