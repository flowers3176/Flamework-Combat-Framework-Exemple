import { createProducer } from "@rbxts/reflex";

interface SlotSliceInterface {
	Slot: number;
	Slots: {
		[key: string]: string;
	};
}

const IS: SlotSliceInterface = {
	Slot: -1,
	Slots: {
		["-1"]: "M1",
		["1"]: "Smash",
		["2"]: `Hulk\nSmash!`,
	},
};

export const SlotsSlice = createProducer(IS, {
	SetSlot: (state, slot: number) => ({
		...state,
		Slot: slot,
	}),
	SetSlots: (
		state,
		Slots: {
			[key: string]: string;
		},
	) => ({
		...state,
		Slots: Slots,
	}),
});
