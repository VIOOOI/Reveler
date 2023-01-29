import { sample } from "effector";
import { hotkey } from "effector-hotkey";
import { useStoreMap, useUnit } from "effector-solid";
import { Component, For, onMount } from "solid-js";

import { Row } from "../../molecules/sliderRow";

import {
	$background,
	$reveler,
	$transform,
	getWindowSize,
	nextRow,
	prevRow,
} from "./store";

export const Slider: Component = () => {
	const background = useUnit($background);
	const transform = useUnit($transform);
	const reveler = useStoreMap<Reveler, RevelerRow>({
		store: $reveler,
		keys: [],
		fn: ( store ) => store.rows,
	});

	onMount(() => getWindowSize());

	sample({
		clock: [ hotkey("о"), hotkey("j"), hotkey("ArrowDown") ],
		target: nextRow,
	});
	sample({
		clock: [ hotkey("л"), hotkey("k"), hotkey("ArrowUp") ],
		target: prevRow,
	});

	return ( 
		<div
			class="wh-screen overflow-hidden box-border"
			style={{ background: background() || "#171717" }}
		>
			<div
				style={{
					transform: `translateY(${transform()}px)`,
					transition: "transform 1s cubic-bezier(.65, 0, .35, 1)",
					background: background() || "#171717",
				}}
			>
				<For each={reveler()} >{ () => 
					<div class="w-screen h-screen flex-center">
						<h1 class="font-[Roboto] text-6xl text-white">Hello Reveler</h1>
					</div>
				}</For>
			</div>
		</div>
	);
};
