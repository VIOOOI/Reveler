import { Control } from "@molecules/control";
import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { ParentComponent } from "solid-js";

import HomeIcon from "../../../public/layouts/home.svg?raw";

import { exitFullScreenFx, redirectToHome, setFullScreenFx } from "./store";

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
			<div
				class="fill-white fixed b-i0.5 l-i0.5"
				innerHTML={HomeIcon}
				onClick={() => redirectToHome()}
			>

			</div>
			<Control />
			{ children }
		</div>
	);
};
