import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/RootProducer";
import { CombatMoves } from "./Movesets/Combat";
import { RemoteEvents } from "server/networking";

const Slots = {
	Combat: CombatMoves,
};

@Service({})
export class MovesetService implements OnStart {
	onStart(): void {
		Players.PlayerAdded.Connect((plr) => {
			producer.SetMoveset(plr, "Combat");
			RemoteEvents.SetSlots(plr, CombatMoves);
		});
	}
}
