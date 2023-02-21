import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { useUnit } from "effector-solid";
import { Component, For, onCleanup, onMount } from "solid-js";

import { Row } from "@molecules/sliderRow";

import { createEventListener } from "@solid-primitives/event-listener";

import {
	$background,
	$reveler,
	$transform,
	getWindowSize,
	leftSlide,
	nextRow,
	prevRow,
	rightSlide,
} from "./store";

export const Slider: Component = () => {
	const background = useUnit($background);
	const transform = useUnit($transform);
	const reveler = useUnit($reveler);

	onMount(() => getWindowSize());
	onMount(() => { document.body.style.overflow = "hidden"; });
	onCleanup(() => { document.body.style.overflow = "auto"; });

	sample({
		clock: [ hotkey("о"), hotkey("j"), hotkey("ArrowDown") ],
		filter: () => {
			if (document.activeElement.localName == "input") return false; 
			else return true;
		},
		target: nextRow,
	});
	sample({
		clock: [ hotkey("л"), hotkey("k"), hotkey("ArrowUp") ],
		filter: () => {
			if (document.activeElement.localName == "input") return false; 
			else return true;
		},
		target: prevRow,
	});
	sample({
		clock: [ hotkey("д"), hotkey("l"), hotkey("ArrowRight") ],
		filter: () => {
			if (document.activeElement.localName == "input") return false; 
			else return true;
		},
		target: rightSlide,
	});
	sample({
		clock: [ hotkey("р"), hotkey("h"), hotkey("ArrowLeft") ],
		filter: () => {
			if (document.activeElement.localName == "input") return false; 
			else return true;
		},
		target: leftSlide,
	});

	createEventListener(
		window,
		"resize",
		() => getWindowSize(),
	);

	return ( 
		<div
			class="wh-screen overflow-hidden box-border"
			style={{ background: background() || "#171717" }}
			id="slider"
		>
			<div
				style={{
					transform: `
						translateY(${transform().y}px)
						translateX(${transform().x}px)
						`,
					transition: "transform 1s cubic-bezier(.65, 0, .35, 1)",
					background: background() || "#171717",
				}}
			>
				<For each={reveler().rows} >{ (row) => 
					<Row rows={row} />
				}</For>
			</div>
		</div>
	);
};
