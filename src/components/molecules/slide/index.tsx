import { createSignal, onMount, Show, splitProps, VoidComponent } from "solid-js";
import Alpine from "alpinejs";
// import evaljs from "evaljs";

import { TemplateSlide } from "@templates/templateSlide";

import { Reveler } from "./revelerScript";

type SlideProps = {
	slide: RSlide,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ { slide } ] = splitProps(props, [ "slide" ]);
	const [ isDone, setIsDone ] = createSignal(false);
	onMount(() => {
		eval(slide.script);
		// setTimeout(() => {
		setIsDone(true);
		// }, 1000);
	});

	const findAttribute = (name: string): string => {
		const result = slide.atributes.find(attr => {
			if ( attr.name == name ) return attr;
		});

		return result ? result.value : null;
	};
	return ( 
		<Show
			when={isDone}
			fallback={<TemplateSlide />}
		>
			<div
				class={`${findAttribute("class") || ""} min-w-screen h-screen p-0`} 
				id="slide"
				style={{
					background: findAttribute("bg_color") || "rgb(23, 23, 23)",
					color: findAttribute("text_color") || "#ffffff",
				}}
				innerHTML={slide.content}
			>
			</div>
		</Show>
	);
};
