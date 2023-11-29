import { Networking } from "@flamework/networking";

// Client -> Server events
interface ServerEvents {
	SendInput: (Input: string, Slot: number) => void;
}

// Server -> Client events
interface ClientEvents {
	SetSlots: (Slots: { [key: string]: string }) => void;
	SetPlayerState: (state: string, val: boolean | string | number) => void;
}

// Returns an object containing a `server` and `client` field.
export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();

// Client -> Server -> Client functions
interface ServerFunctions {}

// Server -> Client -> Server functions
interface ClientFunctions {
	HandleOnClient: (
		Section: "FX" | "Functions",
		Moveset: string,
		Name: string,
		XtraArgs: {
			[key: string]: unknown;
		},
	) => unknown;
}

// Returns an object containing a `server` and `client` field.
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
