import { Service } from "@flamework/core";
import { Inputs } from "server/services/InputReciever";
import M1 from "./Skills/M1";
import GetMoveset from "server/utils/GetMoveset";

export const CombatMoves = {
	["-1"]: "M1",
	["1"]: "Uppercut",
	["2"]: "Kick",
	["3"]: "Hulk \nSmash",
};

const Moves: {
	[key: string]: (plr: Player, input: string) => void;
} = {
	[-1]: M1,
};

@Service({})
export class Combat implements Inputs {
	InputBegan(plr: Player, Input: string, Slot: number) {
		if (Slot in Moves && GetMoveset(plr) === "Combat") {
			Moves[Slot](plr, Input);
		}
	}
}
