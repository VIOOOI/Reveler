import { Component, JSX, splitProps } from "solid-js";

type BlockPropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLElement>

export const Block: Component<BlockPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<div
			class={`${local.class} 
				p-y-i0.55
			`}
			style={{
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</div>
	);
};
