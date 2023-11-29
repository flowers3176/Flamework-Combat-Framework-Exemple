import { Players, TweenService } from "@rbxts/services";
import { producer } from "client/RootProducer";

interface MyArgs {
	MaxSpeed: number;
	MinSpeed: number;
}

const Player = Players.LocalPlayer;

export = async (XtraArgs: MyArgs): Promise<boolean> => {
	const IsRunning = producer.getState().PlayerStates["Running"];
	const Char = Player.Character;
	if (!Char) return IsRunning;
	const H = Char.FindFirstChild("Humanoid") as Humanoid;
	producer.setPlayerState("Running", !IsRunning);
	print(IsRunning);
	const Tween = TweenService.Create(H, new TweenInfo(1), {
		WalkSpeed: !IsRunning ? XtraArgs.MaxSpeed : XtraArgs.MinSpeed,
	});
	Tween.Play();
	Tween.Completed.Wait();
	return !IsRunning;
};
