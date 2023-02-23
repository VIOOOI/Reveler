import { Control } from "@molecules/control";
import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { ParentComponent } from "solid-js";

import HomeIcon from "../../../public/layouts/home.svg?raw";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { closeFullScrean, openFullScrean, redirectToHome } from "./store";

export const RevelerLayout: ParentComponent = ({ children }) => {
	let reveler: HTMLDivElement;

	sample({
		clock: [ hotkey("а"), hotkey("f") ],
		filter: () => {
			const isFullScrean = document.fullscreenElement; 
			const isElementFocuses = document.activeElement?.tagName != "BODY";
			return !isFullScrean && !isElementFocuses;
		},
		target: openFullScrean,
	});

	sample({
		clock: [ hotkey("а"), hotkey("f") ],
		filter: () => document.fullscreenElement?.id == "slider",
		target: closeFullScrean,
	});

	return (
		<div
			class="relative"
			ref={reveler}
		> 
			<div
				class="fill-white z-100 fixed b-i0.5 l-i0.5"
				innerHTML={HomeIcon}
				onClick={() => redirectToHome()}
			>

			</div>
			<Control />
			{ children }
		</div>
	);
};
