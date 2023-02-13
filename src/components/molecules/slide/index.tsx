import { splitProps, VoidComponent, For } from "solid-js";

import { RenderElement } from "../../atoms/renderElement";

type SlideProps = {
	slide: RSlide,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ { slide } ] = splitProps(props, [ "slide" ]);
	console.log(slide.content);
	return ( 
		<div
			class={`${slide.grid || ""} ${slide.class || ""} min-w-screen h-screen p-i1`} 
			style={{
				background: slide.bgColor || "rgb(23, 23, 23)",
				color: slide.textColor || "#ffffff",
			}}
		>
			<For each={slide.content}>{ elem => 
				<RenderElement element={elem} textColor={slide.textColor || ""} />
			}</For>
		</div>
	);
};
