import { Modding, OnStart, Service } from "@flamework/core";
import { RemoteEvents } from "server/networking";

export interface Inputs {
	InputBegan(plr: Player, Input: string, Slot: number): void;
}

@Service({
	loadOrder: -1,
})
export class InputReciever implements OnStart {
	onStart(): void {
		const Listeners = new Set<Inputs>();
		Modding.onListenerAdded<Inputs>((obj: Inputs) => Listeners.add(obj));
		Modding.onListenerRemoved<Inputs>((obj: Inputs) => Listeners.delete(obj));

		RemoteEvents.SendInput.connect((plr, input, slot) =>
			Listeners.forEach((v) => task.spawn(() => v.InputBegan(plr, input, slot))),
		);
	}
}
