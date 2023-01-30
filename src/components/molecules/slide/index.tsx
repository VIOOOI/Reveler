import { Header } from "@atoms/elements";
import { RenderElement } from "@atoms/renderElement ";
import { splitProps, VoidComponent, For } from "solid-js";

type SlideProps = {
	slide: RSlide,
}

export const Slide: VoidComponent<SlideProps> = (props) => {
	const [ { slide } ] = splitProps(props, [ "slide" ]);
	console.log(slide.content);
	return ( 
		<div
			class="min-w-screen h-screen flex-col-center" 
			style={{
				background: slide.bgColor || "rgb(23, 23, 23)",
				color: slide.textColor || "#ffffff",
			}}
		>
			<For each={slide.content}>{ elem => 
				<RenderElement element={elem} textColor={slide.textColor} />
			}</For>
		</div>
	);
};
