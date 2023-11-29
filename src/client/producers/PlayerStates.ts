import { createProducer } from "@rbxts/reflex";

interface PlayerStatesInterface {
	Running: boolean;
}

const IS: PlayerStatesInterface = {
	Running: false,
};

export const PlayerStates = createProducer(IS, {
	setPlayerState: (s1, s: string, v) => ({ ...s1, [s]: v }),
});
