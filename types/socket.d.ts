import type { CardChoice, UserType } from "../src/game-state-provider";

/**
 * Server => Client
 */
export type ServerToClientEvents = {
	assignId: (userId: string) => void;
	entering: (players: UserType[]) => void;
	newPlayer: (player: UserType) => void;
	playerLeft: (playerId: string) => void;
	matchInvite: (senderId: string, senderName: string) => void;
	confirmMatch: (confirmation: boolean) => void;
	choice: (move: CardChoice) => void;
	update: (user: UserType) => void;
};

/**
 * Client => Server
 */
export type ClientToServerEvents = {
	connected: (user: UserType) => void;
	leave: (userId: string) => void;
	requestMatch: (playerId: string) => void;
	confirmMatch: (playerId: string, confirmation: boolean) => void;
	choice: (playerId: string, choice: CardChoice) => void;
	update: (user: UserType) => void;
	heartbeat: () => void;
};
