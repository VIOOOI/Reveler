import { onMount, splitProps, VoidComponent } from "solid-js";
import Alpine from "alpinejs";
import { nextRow } from "@organisms/slider/store";

import { Reveler } from "./revelerScript";

type SlideProps = {
	slide: RSlide,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ { slide } ] = splitProps(props, [ "slide" ]);
	onMount(() => {
		if (slide.content.includes("x-data")) {
			if (!window["Alpine"]){
				window["Alpine"] = Alpine;
				Alpine.start();
			}
		}
		if (!window["Reveler"]){
			window["Reveler"] = Reveler;
		}
		eval(slide.script);
	});

	const findAttribute = (name: string): string => {
		const result = slide.atributes.find(attr => {
			if ( attr.name == name ) return attr;
		});

		return result ? result.value : null;
	};
	return ( 
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
	);
};
