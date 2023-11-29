import { ReplicatedStorage } from "@rbxts/services";

const assets = ReplicatedStorage.WaitForChild("assets");
const camera = assets.WaitForChild("camera");
const animation = assets.WaitForChild("animations");

const CameraAnimations = ["Run"] as const;
const Animations = ["Run"] as const;

type CameraAnimations = (typeof CameraAnimations)[number];
type Animations = (typeof Animations)[number];

export function getCameraKeyframes(name: CameraAnimations) {
	return camera.FindFirstChild(name) as Folder;
}

export function getAnimation(name: Animations) {
	return animation.FindFirstChild(name) as Animation;
}
