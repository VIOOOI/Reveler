import {  Match, Switch, VoidComponent } from "solid-js";

import { nextRow, leftSlide, rightSlide, prevRow } from "../../organisms/slider/store";

import Arrow from "../../../public/arrow.svg?raw";
// import { $bcgCursor } from "@atoms/cursor/store";
// import { useUnit } from "effector-solid";

type ControlButtonPropsType = {
	direction: "top" | "bottom" | "left" | "right",
}

export const ControlButton: VoidComponent<ControlButtonPropsType> = ({ direction }) => {

	return (
		<Switch fallback={<></>} >
			<Match when={direction == "top"} > 
				<div 
					class={`area-${direction} flex-center cursor-pointer`}
					onClick={() => prevRow()}
					innerHTML={Arrow}
					style={{ fill: "#2563eb" }}
				> </div>
			</Match>
			<Match when={direction == "bottom"} > 
				<div 
					class={`area-${direction} flex-center cursor-pointer`}
					onClick={() => nextRow()}
					style={{ 
						transform: "rotate(180deg)",
						fill: "#2563eb",
					}}
					innerHTML={Arrow} 
				>
				</div>
			</Match>
			<Match when={direction == "left"} > 
				<div 
					class={`area-${direction} flex items-center justify-start cursor-pointer`}
					onClick={() => leftSlide()}
					style={{ 
						transform: "rotate(-90deg)",
						fill: "#2563eb",
					}}
					innerHTML={Arrow} 
				>
				</div>
			</Match>
			<Match when={direction == "right"} > 
				<div 
					class={`area-${direction} flex items-center justify-self-end justify-end cursor-pointer`}
					onClick={() => rightSlide()}
					style={{ 
						transform: "rotate(90deg)",
						fill: "#2563eb",
					}}
					innerHTML={Arrow} 
				>
				</div>
			</Match>
		</Switch>
	);
};
