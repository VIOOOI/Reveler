import { Control } from "@molecules/control";
import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { ParentComponent } from "solid-js";

import { exitFullScreenFx, setFullScreenFx } from "./store";

export const RevelerLayout: ParentComponent = ({ children }) => {
	let reveler: HTMLDivElement;

	sample({
		clock: [ hotkey("а"), hotkey("f") ],
		filter: () => !document.fullscreenElement,
		fn: () => reveler,
		target: setFullScreenFx,
	});

	sample({
		clock: [ hotkey("а"), hotkey("f") ],
		filter: () => document.fullscreenElement,
		target: exitFullScreenFx,
	});

	return (
		<div
			class="relative"
			ref={reveler}
		> 
			<Control />
			{ children }
		</div>
	);
};
