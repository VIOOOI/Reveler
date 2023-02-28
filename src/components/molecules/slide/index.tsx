import { createEffect, createSignal, onMount, splitProps, VoidComponent } from "solid-js";

import { TemplateSlide } from "@templates/templateSlide";

import { useUnit } from "effector-solid";
import { $currentRowSlide, $currentSlide } from "@organisms/slider/store";

import { addedAnimationClass, findAttribute, setAnimation, runScript, startScript } from "./utils";

export type SlideProps = {
	slide: RSlide,
	rowCount: number,
	slideCount: number,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ slide ] = splitProps(props, [ "slide", "rowCount", "slideCount" ]);
	const [ cRow, cSlide ] = useUnit([ $currentSlide, $currentRowSlide ]);

	const [ isDoneScript, setIsDoneScript ] = createSignal(false);
	const [ isRuningScript, setIsRuningScript ] = createSignal<Array<boolean>>([]);

	let slideRef: HTMLDivElement;

	onMount(() => {
		startScript(slide, isRuningScript, setIsRuningScript, setIsDoneScript);
		addedAnimationClass(slideRef);
	});

	createEffect(() => { setAnimation(slideRef, cRow, cSlide, slide); });
	createEffect(() => { runScript(cRow, cSlide, slide, isRuningScript, setIsRuningScript); });

	return ( 
		<div
			class={`${findAttribute("class", slide.slide) || ""} min-w-screen h-screen p-0`} 
			id="slide"
			ref={slideRef}
			style={{
				background: findAttribute("background", slide.slide) || "rgb(23, 23, 23)",
				color: findAttribute("text", slide.slide) || "#ffffff",
			}}
			innerHTML={slide.slide.content}
		>
		</div>
	);
};
