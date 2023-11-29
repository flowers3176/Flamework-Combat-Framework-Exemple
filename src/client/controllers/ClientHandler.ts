import { Controller, OnStart } from "@flamework/core";
import { RemoteFunctions } from "client/networking";
import Movesets from "./Movesets";

@Controller({})
export class ClientHandler implements OnStart {
	onStart(): void {
		RemoteFunctions.HandleOnClient.setCallback(async (Section, Moveset, Name, XtraArgs): Promise<unknown> => {
			const ReFormated = Movesets as unknown as {
				[key: string]: {
					Functions: {
						[key: string]: (args: { [key: string]: unknown }) => Promise<unknown>;
					};
					FX: {
						[key: string]: (args: { [key: string]: unknown }) => Promise<unknown>;
					};
				};
			};
			if (Moveset in ReFormated) {
				const SelectedMoveset = ReFormated[Moveset];
				if (Section in SelectedMoveset) {
					const SelectedSection = SelectedMoveset[Section];
					if (Name in SelectedSection) {
						const SelectedFunction = SelectedSection[Name];
						return await SelectedFunction(XtraArgs).expect();
					}
				}
			}
			return;
		});
	}
}
