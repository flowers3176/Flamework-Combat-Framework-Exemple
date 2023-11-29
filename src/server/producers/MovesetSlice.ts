import { createProducer } from "@rbxts/reflex";

interface MovesetSliceIS {
	[key: string]: string;
}

const IS: MovesetSliceIS = {};

export const MovesetSlice = createProducer(IS, {
	SetMoveset: (state, plr: Player, moveset: string) => ({
		...state,
		[plr.Name]: moveset,
	}),
});
