import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { useUnit } from "effector-solid";
import { Component, For, onMount } from "solid-js";

import { Row } from "@molecules/sliderRow";

import { createEventListener } from "@solid-primitives/event-listener";

import { Control } from "@molecules/control";

import {
	$background,
	$transform,
	getWindowSize,
	leftSlide,
	nextRow,
	prevRow,
	rightSlide,
} from "./store";
import { $slidesFactory, getSlideFactory } from "./genSlide";

export const Slider: Component = () => {
	const background = useUnit($background);
	const transform = useUnit($transform);
	// const reveler = useStoreMap<Reveler, RevelerRow>({
	// 	store: $reveler,
	// 	keys: [],
	// 	fn: ( store ) => store.rows,
	// });
	const revelerFactory = useUnit($slidesFactory);

	onMount(() => getWindowSize());
	onMount(() => getSlideFactory());

	sample({
		clock: [ hotkey("о"), hotkey("j"), hotkey("ArrowDown") ],
		target: nextRow,
	});
	sample({
		clock: [ hotkey("л"), hotkey("k"), hotkey("ArrowUp") ],
		target: prevRow,
	});
	sample({
		clock: [ hotkey("д"), hotkey("l"), hotkey("ArrowRight") ],
		target: rightSlide,
	});
	sample({
		clock: [ hotkey("р"), hotkey("h"), hotkey("ArrowLeft") ],
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
				<For each={revelerFactory()} >{ (model) => 
					<Row model={model} />
				}</For>
			</div>
		</div>
	);
};
