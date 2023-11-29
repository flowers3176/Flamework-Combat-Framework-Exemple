import { Controller, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { producer } from "client/RootProducer";
import { CameraFillePlayer } from "client/utils/CameraFilePlayer";
import { getAnimation, getCameraKeyframes } from "shared/utils/get";

@Controller({})
export class Run implements OnStart {
	onStart(): void {
		const Player = Players.LocalPlayer;
		const Jan = new Janitor();
		task.spawn(() => {
			const Jan = new Janitor();
			const RunServiceJan = new Janitor();
			function ApplyCameraMod(char: Model) {
				Jan.Cleanup();
				RunServiceJan.Cleanup();
				const Head = char.WaitForChild("Head") as BasePart;
				const HRP = char.WaitForChild("HumanoidRootPart") as BasePart;
				const Camera = Workspace.CurrentCamera;
				producer.setPlayerState("Running", false);
				while (!Camera) task.wait();
				Camera.CameraSubject = Head;
				Jan.Add(
					UserInputService.InputChanged.Connect((input, gpe) => {
						if (UserInputService.MouseBehavior === Enum.MouseBehavior.LockCenter) {
							RunServiceJan.Cleanup();
							RunServiceJan.Add(
								RunService.RenderStepped.Connect(() => {
									let LookVector = Camera.CFrame.LookVector;
									LookVector = new Vector3(LookVector.X, 0, LookVector.Z).Unit;
									const newCFrame = CFrame.lookAt(
										HRP.Position,
										HRP.Position.add(LookVector),
										new Vector3(0, 1, 0),
									);
									HRP.CFrame = newCFrame;
								}),
							);
						} else RunServiceJan.Cleanup();
					}),
				);
			}

			const Char = Player.Character ?? Player.CharacterAdded.Wait()[0];
			ApplyCameraMod(Char);
			Player.CharacterAdded.Connect(ApplyCameraMod);
		});
		producer.subscribe(
			(v) => v.PlayerStates.Running,
			(now, b4) => {
				Jan.Cleanup();
				if (now) {
					Jan.Add(
						task.spawn(() => {
							const RunAnimation = getAnimation("Run");
							const Char = Player.Character ?? Player.CharacterAdded.Wait()[0];
							if (!Char) return;
							const H = Char.WaitForChild("Humanoid") as Humanoid;
							const HRP = Char.FindFirstChild("HumanoidRootPart") as BasePart;
							const RunCamera = new CameraFillePlayer(getCameraKeyframes("Run"), false, true, HRP);
							const Animator = H.WaitForChild("Animator") as Animator;
							const Run = Animator.LoadAnimation(RunAnimation);
							Run.AdjustSpeed(1);
							H.GetPropertyChangedSignal("FloorMaterial").Connect(() => {
								const Material = H.FloorMaterial;
								if (Material === Enum.Material.Air) {
									Run.AdjustSpeed(0.3);
								} else Run.AdjustSpeed(1);
							});
							Run.KeyframeReached.Connect((str) => {
								if (str === "Step") {
									const tween = TweenService.Create(
										H,
										new TweenInfo(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
										{ WalkSpeed: 10 },
									);
									tween.Play();
								} else if (str === "Air") {
									const tween = TweenService.Create(
										H,
										new TweenInfo(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.In),
										{ WalkSpeed: 40 },
									);
									tween.Play();
								}
							});
							Jan.Add(
								H.Running.Connect((speed) => {
									if (!(speed > 1)) {
										RunCamera.Stop();
										Run.Stop();
									} else {
										if (!Run.IsPlaying) {
											Run.Play();
											RunCamera.Play();
										}
									}
								}),
							);
							Run.Play();
							RunCamera.Play();
							Jan.Add(() => {
								Run.Stop();
								RunCamera.Stop();
								const tween = TweenService.Create(
									H,
									new TweenInfo(0.25, Enum.EasingStyle.Quad, Enum.EasingDirection.In),
									{ WalkSpeed: 16 },
								);
								tween.Play();
							});
							const speed = HRP.AssemblyAngularVelocity.Magnitude;
							if (!(speed > 2)) {
								Run.Stop();
								RunCamera.Stop();
							} else {
								if (!Run.IsPlaying) {
									Run.Play();
									RunCamera.Play();
								}
							}
						}),
					);
				}
			},
		);
	}
}
