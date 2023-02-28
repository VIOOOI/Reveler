import { useUnit } from "effector-solid";
import { Component, For, onCleanup, onMount } from "solid-js";
import Alpine from "alpinejs";

import { Row } from "@molecules/sliderRow";

import { createEventListener } from "@solid-primitives/event-listener";

import { Reveler } from "@molecules/slide/revelerScript";

import {
	$background,
	$reveler,
	$transform,
	clearReveler,
	getWindowSize,
} from "./store";

export const Slider: Component = () => {
	const background = useUnit($background);
	const transform = useUnit($transform);
	const reveler = useUnit($reveler);

	onMount(() => {
		// document.title = "Просмотр презентации";
		getWindowSize();
		document.body.style.overflow = "hidden";
		window["Reveler"] = Reveler;
		window["Alpine"] = Alpine;
		Alpine.start();
	});

	onCleanup(() => {
		document.body.style.overflow = "auto";
		window["Reveler"] = null;
		window["Alpine"] = null;
		clearReveler();
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
				<For each={reveler().rows} >{ (row, index) => 
					<Row 
						rows={row} 
						rowCount={index()}
					/>
				}</For>
			</div>
		</div>
	);
};
