import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "types/socket";
import { CardChoice, UserType } from "./game-state-provider";
type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export default function connectSocket() {
	//TODO: change the server url to an environment variable
	const socket: AppSocket = io("http://localhost:5000");

	const connect = (user: UserType) => {
		socket.emit("connected", user);
	};

	// !Make sure this happens on 'beforeunload' event
	const disconnect = (userId: string) => {
		socket.emit("leave", userId);
	};

	const requestMatch = (playerId: string) => {
		socket.emit("requestMatch", playerId);
	};

	const confirmMatch = (playerId: string, confirmation: boolean) => {
		socket.emit("confirmMatch", playerId, confirmation);
	};

	const makeAMove = (playerId: string, choice: CardChoice) => {
		socket.emit("choice", playerId, choice);
	};

	const update = (user: UserType) => {
		socket.emit("update", user);
	};

	const sendHeartbeat = () => {
		socket.emit("heartbeat");
	};

	const subToMatch = (
		handler: (playerId: string, playerName: string) => void,
	) => {
		socket.on("matchInvite", handler);
	};

	const subToConfirmation = (handler: (confirmation: boolean) => void) => {
		socket.on("confirmMatch", handler);
	};

	const subToOpponentMove = (handler: (opponentChoice: CardChoice) => void) => {
		socket.on("choice", handler);
	};

	const subToUpdates = (handler: (user: UserType) => void) => {
		socket.on("update", handler);
	};

	const subToIdAssignment = (handler: (userId: string) => void) => {
		socket.on("assignId", handler);
	};

	const subToEntering = (handler: (players: UserType[]) => void) => {
		socket.on("entering", handler);
	};

	const subToNewPlayer = (handler: (player: UserType) => void) => {
		socket.on("newPlayer", handler);
	};

	const subToPlayerLeft = (handler: (playerId: string) => void) => {
		socket.on("playerLeft", handler);
	};

	return {
		connect,
		disconnect,
		requestMatch,
		confirmMatch,
		makeAMove,
		update,
		subToMatch,
		subToConfirmation,
		subToOpponentMove,
		subToUpdates,
		subToIdAssignment,
		subToEntering,
		subToNewPlayer,
		subToPlayerLeft,
		sendHeartbeat,
	};
}
