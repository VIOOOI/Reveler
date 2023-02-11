
import { createEventListener } from "@solid-primitives/event-listener";
import { useUnit } from "effector-solid";

import { ConstructorGraph } from "@molecules/constuctorGraph";

import { $transformStore, setFirstPositionEvent, setLastPositionEvent, setTransformEvent } from "./store";

import type { VoidComponent } from "solid-js";


export const ViewConstructor: VoidComponent = () => {
	const position = useUnit($transformStore);
	let viewRef: HTMLDivElement;
	let graphRef: HTMLDivElement;

	createEventListener( 
		() => viewRef, "mousemove",
		event => {
			setTransformEvent({ x: event.clientX, y: event.clientY });
		},
	);

	createEventListener( 
		() => viewRef, "mousedown",
		event => {
			setFirstPositionEvent({ x: event.clientX, y: event.clientY });
		},
	);
	createEventListener( 
		() => viewRef, "mouseup",
		event => {
			setLastPositionEvent();
		},
	);

	return ( 
		<div
			ref={viewRef}
			id="view"
			class="relative w-screen h-screen"
		>
			<h2>{position().x } : { position().y}</h2>
			<ConstructorGraph ref={graphRef} />
		</div>
	);
};
