import { RemoteFunctions } from "server/networking";

export = (plr: Player, input: string) => {
	if (input === Enum.KeyCode.LeftAlt.Name) {
		RemoteFunctions.HandleOnClient.invoke(plr, "Functions", "Movement", "ToggleSprint", {
			MaxSpeed: 40,
			MinSpeed: 16,
		});
	}
};
