import { JSXElement, createContext, onCleanup, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import connectSocket from "./connect-socket";

export type CardChoice = "rock" | "paper" | "scissors";
export type UserType = {
    name: string;
    available: boolean;
    id: string;
};
type GameState = {
    start: boolean;
    registered: boolean;
    inMatch: boolean;
    user: UserType | null;
    players: UserType[];
    choice: CardChoice | null;
    outRequest: string;
    background: string;
    title_message: string;
    opponent: string | null;
};
const defaultGameState = {
    start: false, // This is for the timer
    registered: false, // This is for the initial login
    inMatch: false, // Signals whether user is in a match or not
    user: null, // Self user object
    players: [], // List of players online
    choice: null, // Default choice of card
    outRequest: "none",
    background: "#FFFFFF",
    title_message: "",
    opponent: null,
};

type GameActions = {
    handleStart: () => void;
    handleReset: () => void;
    setPlayerName: (name: string) => void;
    sendMatchRequest: (id: string) => void;
    timerDone: () => void;
    updateChoice: (choice: CardChoice) => void;
    toggleOutRequest: () => void;
};
type GameContext = [GameState, GameActions];

const GameStateContext = createContext<GameContext>([
    defaultGameState,
    {
        handleStart: () => {},
        handleReset: () => {},
        setPlayerName: () => {
            console.log("default function called");
        },
        sendMatchRequest: () => {},
        timerDone: () => {},
        updateChoice: () => {},
        toggleOutRequest: () => {},
    },
]);

export function GameStateProvider(props: { children: JSXElement }) {
    const [state, setState] = createStore<GameState>(defaultGameState);
    let socketAPI: ReturnType<typeof connectSocket>;

    function subToServerNotifications() {
        socketAPI.subToNewPlayer((player) => {
            console.log("new player", player);
            setState("players", (players) => [...players, player]);
        });

        socketAPI.subToConfirmation((confirmed) => {
            if (!confirmed) {
                setState({
                    opponent: null,
                    outRequest: "rejected",
                    title_message: "your request has been rejected",
                    background: "tomato",
                });
                setTimeout(() => {
                    setState({
                        title_message: "Challenge someone else!",
                        background: "#FFFFFF",
                    });
                });
                return;
            }

            setState({
                inMatch: true,
                outRequest: "accepted",
                title_message: "Rock, Paper, Scissors !!",
            });

            toggleAvailable();
            handleStart(); // start game right away
        });

        socketAPI.subToMatch((playerId, playerName) => {
            alert(`You've been challenged by ${playerName}(id=${playerId})`);
        });
    }

    const toggleAvailable = () => {
        const { user } = state;
        if (!user) return;
        const { available } = user;
        setState("user", { available: !available });
        socketAPI.update(user); // TODO: check if this works as intended, state might not be updated yet
    };

    const handleStart = () => {
        setState("start", true);
    };

    const handleReset = () => {
        //TODO: Reset the game state
    };

    const toggleOutRequest = () => {
        setState((bState) =>
            bState.outRequest === "sent"
                ? { outRequest: "none" }
                : { outRequest: "sent" },
        );
    };

    function setPlayerName(name: string) {
        console.log("player set");
        socketAPI = connectSocket();

        socketAPI.subToEntering((players) => {
            console.log("entering", players);
            setState(
                "players",
                players.filter((p) => p.id !== state.user?.id),
            );
        });

        socketAPI.subToIdAssignment((id) => {
            console.log("id assigned", id);
            setState("user", { id });
        });

        socketAPI.subToPlayerLeft((id) => {
            console.log("player left", id);
            setState(
                "players",
                state.players.filter((p) => p.id !== id),
            );
        });
        setState("user", { name, available: true });
        //TODO: set other things & connect the user to the server
        socketAPI.connect({ name, available: true, id: "" });
        subToServerNotifications();
        setInterval(() => socketAPI.sendHeartbeat(), 4000);
    }

    const sendMatchRequest = (id: string) => {
        setState({
            opponent: id,
            outRequest: "sent",
        });
        socketAPI.requestMatch(id);
    };

    const timerDone = () => {
        //TODO: emit a socket message to the server
    };

    const updateChoice = (choice: CardChoice) => {
        setState("choice", choice);
    };

    onCleanup(() => {
        console.log("cleanup");
        socketAPI.disconnect(state.user?.id || "");
    });

    const gameCtx: GameContext = [
        state,
        {
            handleStart,
            handleReset,
            setPlayerName,
            sendMatchRequest,
            timerDone,
            updateChoice,
            toggleOutRequest,
        },
    ];
    return (
        <GameStateContext.Provider value={gameCtx}>
            {props.children}
        </GameStateContext.Provider>
    );
}

export function useGameState() {
    return useContext(GameStateContext);
}
