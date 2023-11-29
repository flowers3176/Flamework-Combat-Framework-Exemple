import Roact, { Element, useEffect, useMemo } from "@rbxts/roact";
import { producer, useRootProducer, useRootSelector } from "client/RootProducer";
import Slot from "./Slot";
import { useRem } from "client/hooks/use-rem";
import { UserInputService } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";

export = () => {
	const rem = useRem();
	const Slots = useRootSelector((v) => v.Slot.Slots);
	const Jan = useMemo(() => new Janitor(), []);
	const Elements: Element[] = [];
	const { SetSlot } = useRootProducer();
	for (const [i, v] of pairs(Slots)) {
		if (i !== "-1") {
			Elements.push(<Slot SlotName={v} Number={tostring(i)} />);
		}
	}
	print(Slots);
	Jan.Cleanup();
	Jan.Add(
		UserInputService.InputBegan.Connect((i, gpe) => {
			if (gpe) return;
			if (i.KeyCode.Value >= Enum.KeyCode.Zero.Value && i.KeyCode.Value <= Enum.KeyCode.Nine.Value) {
				const Number = i.KeyCode.Value - Enum.KeyCode.Zero.Value;
				if (tostring(Number) in Slots) {
					if (Number !== producer.getState().Slot.Slot) {
						SetSlot(Number);
					} else SetSlot(-1);
				}
			}
		}),
	);
	return (
		<screengui ResetOnSpawn={false}>
			<frame
				Size={UDim2.fromScale(0, 0).add(UDim2.fromOffset(0, rem(9)))}
				Position={UDim2.fromScale(0.5, 0.9)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={0.1}
				BackgroundColor3={Color3.fromRGB(25, 25, 25)}
				Event={{
					ChildAdded: (rbx) => {
						const Frames = rbx.GetChildren().size() - 2;
						rbx.Size = UDim2.fromOffset(rem(Frames * (7 + 0.4) + 0.425), rem(7 + 0.85));
					},
				}}
				ref={(rbx) =>
					task.spawn(() => {
						while (!rbx) task.wait();
						const Frames = rbx.GetChildren().size() - 2;
						rbx.Size = UDim2.fromOffset(rem(Frames * (7 + 0.4) + 0.425), rem(7 + 0.85));
					})
				}
			>
				<uicorner CornerRadius={new UDim(0, rem(0.7))} />
				<uilistlayout
					SortOrder={"Name"}
					FillDirection={"Horizontal"}
					ItemLineAlignment={"Center"}
					VerticalAlignment={"Center"}
					HorizontalAlignment={"Center"}
					Padding={new UDim(0, rem(0.425))}
				/>
				{...Elements}
			</frame>
		</screengui>
	);
};
