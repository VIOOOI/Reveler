import { Component, JSX, onMount, splitProps } from "solid-js";
import Alpine from "alpinejs";
import { createEventListener } from "@solid-primitives/event-listener";

type ReactivePropsType = JSX.HTMLAttributes<HTMLElement>

export const Reactive: Component<ReactivePropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"children", "style",
	]);

	onMount(() => {
		if (!window["Alpine"]){
			window["Alpine"] = Alpine;
			Alpine.start();
		}
	});

	createEventListener( 
		document, "alpine:init",
		() => {
			const rscript = /<script>((.|\n|\r\n)*?)<\/script>/;
			if (rscript.test(local.children as string)) {
				const str = local.children as string; 
				const regstr = str.split(rscript);
				regstr.forEach( jscode => {
					if(/Alpine\.(data|store|bind)\(.*\)/.test(jscode)){
						eval(jscode);
					}
				} );
			}
		},
	);

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
