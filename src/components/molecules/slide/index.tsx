import { createEffect, createSignal, onMount, Show, splitProps, VoidComponent } from "solid-js";
import Alpine from "alpinejs";
// import evaljs from "evaljs";

import { TemplateSlide } from "@templates/templateSlide";

import { useUnit } from "effector-solid";
import { $currentRowSlide, $currentSlide } from "@organisms/slider/store";

type SlideProps = {
	slide: RSlide,
	rowCount: number,
	slideCount: number,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ slide ] = splitProps(props, [ "slide", "rowCount", "slideCount" ]);
	const [ isDone, setIsDone ] = createSignal(false);
	const [ isRunin, setIsRunin ] = createSignal<Array<boolean>>([]);
	const [ currentRow, currentSlide ] = useUnit([ $currentSlide, $currentRowSlide ]);

	onMount(() => {
		slide.slide.script.forEach(s => {
			if(s.isGlobal) {
				eval(s.script);
			} else {
				setIsRunin([ ...isRunin(), false ]);
			}
		});
		setIsDone(true);
	});
	createEffect(() => {
		if(currentRow() == slide.rowCount && currentSlide() == slide.slideCount) {
			slide.slide.script.forEach((s, index) => {
				setTimeout(() => {
					if(!s.isGlobal) {
						if (s.isOnes && isRunin()[index]) { return; }
						else eval(s.script);
					}
					const ns = isRunin().map((item, i) => {
						if(i == index) return true; 
						return item;
					});
					setIsRunin(ns);
				}, 850);
			});
		}
	});

	const findAttribute = (name: string): string => {
		const result = slide.slide.atributes.find(attr => {
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
				innerHTML={slide.slide.content}
			>
			</div>
		</Show>
	);
};
