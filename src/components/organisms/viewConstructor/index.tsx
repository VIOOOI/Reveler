
import { createEventListener } from "@solid-primitives/event-listener";
import { useUnit } from "effector-solid";

import { ConstructorGraph } from "@molecules/constuctorGraph";

// import { $position, isPossibleTrue, isPossibleFalse, setMouseMove, startMove, stopMove } from "./store";

import type { VoidComponent } from "solid-js";


export const ViewConstructor: VoidComponent = () => {
	const position = useUnit($position);
	let viewRef: HTMLDivElement;

	// createEventListener( 
	// 	() => viewRef, "mousemove",
	// 	event => setMouseMove(event),
	// );

	// createEventListener( 
	// 	() => viewRef, "mousedown",
	// 	event => startMove(event),
	// );
	// createEventListener( 
	// 	() => viewRef, "mouseup",
	// 	event => stopMove(event),
	// );

	return ( 
		<div
			ref={viewRef}
			id="view"
			class="relative w-screen h-screen"
		>
			<h2>{position().x } : { position().y}</h2>
			<ConstructorGraph />
		</div>
	);
};
