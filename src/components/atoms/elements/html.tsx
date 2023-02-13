import { Component, JSX, splitProps } from "solid-js";

type HtmlPropsType = JSX.HTMLAttributes<HTMLElement>

export const Html: Component<HtmlPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"children", "style",
	]);


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
