import { Cooldown } from "shared/utils/Cooldown";

const CombatCD = new Cooldown();

export = (plr: Player, key: string) => {
	if (key === "M1") {
		if (!CombatCD.GetCD(plr)) {
			CombatCD.AddCD(plr, math.random(300, 600) / 1000);
			print("PUNCH");
		}
	}
};
