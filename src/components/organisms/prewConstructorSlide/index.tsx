import { createEventListener } from "@solid-primitives/event-listener";
import { Component } from "solid-js";

export const PrewSlide: Component = () => {
	let prewRef: HTMLDivElement;
	createEventListener( 
		() => prewRef, "mousedown",
		event => event.stopPropagation(),
	);
	return ( 
		<div 
			class="
				p-5 bg-dark w-75vw lg:w-60vw h-100vh fixed top-0 right-0 z-10
				flex-center
			"
			ref={prewRef}
		>
			<div
				class="
					lg:(w-50vw h-28vw)
					w-60vw h-33vw 
					bg-white rounded-lg
				"
			>

			</div>

		</div>
	);
};
