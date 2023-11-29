import { ReflexProvider } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { producer } from "client/RootProducer";
import Slots from "client/pages/Slots";

export = (f: Frame) => {
	const Handle = Roact.mount(
		<ReflexProvider producer={producer}>
			<Slots />
		</ReflexProvider>,
		f,
	);
	return () => Roact.unmount(Handle);
};
