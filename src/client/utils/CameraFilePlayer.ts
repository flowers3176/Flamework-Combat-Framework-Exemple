import { Janitor } from "@rbxts/janitor";
import { Players, RunService, Workspace } from "@rbxts/services";

const Player = Players.LocalPlayer;

export class CameraFillePlayer {
	private Folder: Folder;
	private Looped: boolean;
	private Destructor: Janitor;
	private Ref: BasePart;

	private IncludeCFrame: boolean;
	constructor(Folder: Folder, IncludeCFrame: boolean, Looped: boolean, Ref: BasePart) {
		this.Folder = Folder;
		this.Looped = Looped;
		this.Destructor = new Janitor();
		this.Ref = Ref;
		this.IncludeCFrame = IncludeCFrame;
	}
	Play() {
		const Camera = Workspace.CurrentCamera as Camera;
		const Character = Player.Character ?? Player.CharacterAdded.Wait()[0];
		const Humanoid = Character.FindFirstChild("Humanoid") as Humanoid;
		if (this.IncludeCFrame) {
			Camera.HeadLocked = false;
			Humanoid.AutoRotate = false;
			Camera.CameraType = Enum.CameraType.Scriptable;
			Camera.HeadLocked = false;
		}
		const Folder = this.Folder;
		const Reference = this.Ref;
		const CurrentCameraCFrame = Camera.CFrame;
		const CurrentCameraFOV = Camera.FieldOfView;
		let FrameTime = 0;
		const Destructor = this.Destructor;
		Destructor.Add(() => {
			Camera.HeadLocked = true;
			Humanoid.AutoRotate = true;
			Camera.CameraType = Enum.CameraType.Custom;
			if (this.IncludeCFrame) {
				Camera.CFrame = CurrentCameraCFrame;
			}
			Camera.FieldOfView = CurrentCameraFOV;
			Destructor.Cleanup();
		});
		Destructor.Add(
			RunService.RenderStepped.Connect((dt) => {
				FrameTime += dt * 60;
				const NeededFrame = this.Folder.FindFirstChild("Frames")?.FindFirstChild(
					tostring(tonumber(math.ceil(FrameTime))),
				) as CFrameValue;
				const NeededFrame2 = Folder.FindFirstChild("FOV")?.FindFirstChild(
					tostring(tonumber(math.ceil(FrameTime))),
				) as NumberValue;
				if (NeededFrame2 !== undefined) Camera.FieldOfView = NeededFrame2.Value;
				if (NeededFrame !== undefined) Camera.CFrame = Reference.CFrame.mul(NeededFrame.Value);

				if (!NeededFrame && !NeededFrame2) {
					if (!this.Looped) {
						Destructor.Cleanup();
					} else FrameTime = 0;
				}
			}),
		);
	}
	Stop() {
		this.Destructor.Cleanup();
	}
}

/* ref
import { Janitor } from "@rbxts/janitor";
import { Players, Workspace, RunService } from "@rbxts/services";

const Player = Players.LocalPlayer;

export = (CinematicFolder: Folder, Reference: BasePart) => {
	const Camera = Workspace.CurrentCamera as Camera;
	Camera.HeadLocked = false;
	const CurrentCameraCFrame = Camera.CFrame;
	let FrameTime = 0;
	const Destructor = new Janitor<Instance>();
	const Character = Player.Character ?? Player.CharacterAdded.Wait()[0];
	const Humanoid = Character.FindFirstChild("Humanoid") as Humanoid;
	Humanoid.AutoRotate = false;
	Camera.CameraType = Enum.CameraType.Scriptable;
	Destructor.Add(
		RunService.RenderStepped.Connect((dt) => {
			FrameTime += dt * 60;
			const NeededFrame = CinematicFolder.FindFirstChild("Frames")?.FindFirstChild(
				tostring(tonumber(math.ceil(FrameTime))),
			) as CFrameValue;
			const NeededFrame2 = CinematicFolder.FindFirstChild("FOV")?.FindFirstChild(
				tostring(tonumber(math.ceil(FrameTime))),
			) as NumberValue;
			if (NeededFrame2 !== undefined) Camera.FieldOfView = NeededFrame2.Value;
			if (NeededFrame !== undefined) {
				Camera.CFrame = Reference.CFrame.mul(NeededFrame.Value);
			} else {
				Camera.HeadLocked = true;
				Humanoid.AutoRotate = true;
				Camera.CameraType = Enum.CameraType.Custom;
				Camera.CFrame = CurrentCameraCFrame;
				Destructor.Cleanup();
			}
		}),
	);
};
*/
