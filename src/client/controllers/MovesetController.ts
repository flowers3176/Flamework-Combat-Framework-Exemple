import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/RootProducer";
import { RemoteEvents } from "client/networking";

@Controller({})
export class MovesetController implements OnStart {
	onStart(): void {
		RemoteEvents.SetSlots.connect((v) => producer.SetSlots(v));
	}
}
