import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { producer } from "client/RootProducer";
import { RemoteEvents } from "client/networking";

@Controller({
	loadOrder: -1,
})
export class InputReflex implements OnStart {
	onStart(): void {
		UserInputService.InputBegan.Connect((i, gpe) => {
			if (gpe) return;
			const Slot = producer.getState().Slot.Slot;
			let Input: string = "NIL";
			switch (i.UserInputType) {
				case Enum.UserInputType.MouseButton1: {
					Input = "M1";
					break;
				}
				case Enum.UserInputType.MouseButton2: {
					Input = "M2";
					break;
				}
				case Enum.UserInputType.Keyboard: {
					Input = i.KeyCode.Name;
					break;
				}
			}
			RemoteEvents.SendInput(Input, Slot);
		});
	}
}
