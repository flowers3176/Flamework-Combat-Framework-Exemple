export class Cooldown {
	private CurrentCDs: Map<Player, thread>;
	constructor() {
		this.CurrentCDs = new Map<Player, thread>();
	}

	AddCD(plr: Player, CD: number) {
		const CurrentCDs = this.CurrentCDs;
		const CurrenThread = CurrentCDs.get(plr);
		CurrenThread && task.cancel(CurrenThread);
		CurrentCDs.set(
			plr,
			task.delay(CD, () => {
				CurrentCDs.delete(plr);
			}),
		);
	}

	GetCD(plr: Player) {
		const CurrentCDs = this.CurrentCDs;
		const CurrenThread = CurrentCDs.get(plr);
		return CurrenThread ? true : false;
	}
}
