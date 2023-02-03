import { Component, JSX, onMount, splitProps } from "solid-js";
import Alpine from "alpinejs";

type ReactivePropsType = JSX.HTMLAttributes<HTMLElement>

export const Reactive: Component<ReactivePropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"children", "style",
	]);

	if (!window["Alpine"]){
		window["Alpine"] = Alpine;
		console.log(window["Alpine"]);
		Alpine.start();
		const rscript = /<script>((.|\n|\r\n)*?)<\/script>/;
		if (rscript.test(local.children as string)) {
			const code = rscript.exec(local.children as string)[1];
			eval(code);
		}
	}

	return (
		<div
			class="w-full h-full"
			style={{
				...local.style as JSX.CSSProperties,
			}}
			innerHTML={local.children as string}
			{...other}
		/>
	);
};
