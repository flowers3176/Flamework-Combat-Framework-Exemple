import { InferState, combineProducers } from "@rbxts/reflex";
import { MovesetSlice } from "./producers/MovesetSlice";
export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	Moveset: MovesetSlice,
});
