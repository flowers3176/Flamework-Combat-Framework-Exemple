import { Controller, OnStart } from "@flamework/core";
import { ReflexProvider } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { producer } from "client/RootProducer";
import Slots from "client/pages/Slots";

@Controller({})
export class UIController implements OnStart {
	onStart(): void {
		const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui");
		Roact.mount(
			<ReflexProvider producer={producer}>
				<Slots />
			</ReflexProvider>,
			PlayerGUI,
		);
	}
}
