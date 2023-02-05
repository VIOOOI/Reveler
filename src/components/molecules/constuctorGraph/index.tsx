import { $position } from "@organisms/viewConstructor/store";
import { createEventListener } from "@solid-primitives/event-listener";
import { useUnit } from "effector-solid";
import { VoidComponent } from "solid-js";

export const ConstructorGraph: VoidComponent = () => {
	const position = useUnit($position);
	let graphRef: HTMLDivElement;

	createEventListener( 
		() => graphRef, "mousedown",
		event => event.stopPropagation(),
	);
	return ( 
		<div 
			class="inline absolute flex-col-center gap-y-5"
			id="graph-slide"
			ref={graphRef}
			style={{
				transform: `translate(${position().x}px, ${position().y}px)`,
			}}
		>
			<h2>{position().x} : {position().y}</h2>
			<div 
				class="w-50 h-30 rounded-lg flex-center m-3 bg-blue"
			>Slide</div>

			<div 
				class="w-50 h-30 rounded-lg flex-center m-3 bg-blue"
			>Slide</div>
		</div>
	);
};

