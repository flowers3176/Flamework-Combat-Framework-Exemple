import { Service } from "@flamework/core";
import { Inputs } from "server/services/InputReciever";
import GetMoveset from "server/utils/GetMoveset";
import Sprint from "./Skills/Sprint";

const Moves = [Sprint];

@Service({})
export class Combat implements Inputs {
	InputBegan(plr: Player, Input: string) {
		Moves.forEach((v) => v(plr, Input));
	}
}
