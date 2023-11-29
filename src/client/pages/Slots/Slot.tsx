import Roact, { useEffect } from "@rbxts/roact";
import { TweenService } from "@rbxts/services";
import { producer, useRootProducer, useRootSelector } from "client/RootProducer";
import { useMotion } from "client/hooks/use-motion";
import { useRem } from "client/hooks/use-rem";

interface Args {
	SlotName: string;
	Number: string;
}

let Last = -1;
export = (Args: Args) => {
	const rem = useRem();
	const CurrentSlot = useRootSelector((v) => v.Slot.Slot);
	const { SetSlot } = useRootProducer();
	const TI = new TweenInfo(0.25);
	useEffect(() => {
		producer.subscribe(
			(v) => v.Slot.Slot,
			(now, b4) => (Last !== b4 ? (Last = b4) : (Last = -1)),
		);
	}, []);

	return (
		<frame Size={UDim2.fromOffset(rem(7), rem(7))} BackgroundTransparency={1} key={Args.Number}>
			<textbutton
				RichText={true}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundColor3={
					tostring(Last) !== Args.Number
						? tostring(CurrentSlot) !== Args.Number
							? Color3.fromRGB(51, 51, 51)
							: Color3.fromRGB(51, 51, 51)
						: Color3.fromRGB(234, 31, 31)
				}
				BackgroundTransparency={0.4}
				Size={UDim2.fromOffset(rem(7), rem(7))}
				Text={Args.SlotName}
				TextSize={rem(1)}
				ref={(rbx) =>
					task.spawn(() => {
						while (!rbx) task.wait();
						if (tostring(producer.getState().Slot.Slot) === Args.Number) {
							const tween = TweenService.Create(rbx, TI, {
								BackgroundColor3: Color3.fromRGB(234, 31, 31),
							});
							tween.Play();
						} else {
							const tween = TweenService.Create(rbx, TI, {
								BackgroundColor3: Color3.fromRGB(51, 51, 51),
							});
							tween.Play();
						}
					})
				}
				Event={{
					Activated: (rbx, i) => {
						if (i.UserInputType === Enum.UserInputType.MouseButton1) {
							if (tostring(producer.getState().Slot.Slot) !== Args.Number) {
								const tween = TweenService.Create(rbx, TI, {
									BackgroundColor3: Color3.fromRGB(234, 31, 31),
								});
								tween.Play();
								SetSlot(tonumber(Args.Number) ?? -1);
							} else {
								const tween = TweenService.Create(rbx, TI, {
									BackgroundColor3: Color3.fromRGB(51, 51, 51),
								});
								tween.Play();
								SetSlot(-1);
							}
						}
					},
				}}
			>
				<textlabel
					TextSize={rem(0.9)}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					Size={UDim2.fromOffset(rem(1), rem(1))}
					Position={UDim2.fromOffset(rem(0.6), rem(0.6))}
					Text={Args.Number}
					BackgroundTransparency={1}
				/>
				<uicorner CornerRadius={new UDim(0, rem(0.7))} />
			</textbutton>
		</frame>
	);
};
