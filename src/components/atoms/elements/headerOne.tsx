import { Component, JSX, onMount, splitProps } from "solid-js";

type HeaderOnePropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLElement>

export const HeaderOne: Component<HeaderOnePropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<h1
			class={`${local.class} 
				ifont-size-2.5 
				imargin-y-0.45
			`}
			style={{
				color: local.color || "#fff",
				...local.style as JSX.CSSProperties,
			}}
			{ ...other }
		>{ local.children }</h1>
	);
};
