import { InferState, combineProducers } from "@rbxts/reflex";
import { SlotsSlice } from "./producers/Slots";
import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex";
import { PlayerStates } from "./producers/PlayerStates";
export type RootProducer = typeof producer;

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	Slot: SlotsSlice,
	PlayerStates: PlayerStates,
});
