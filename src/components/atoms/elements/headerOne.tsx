import { Component, JSX, splitProps } from "solid-js";

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
				fz-i2.5 
				m-y-i0.45
			`}
			style={{
				color: local.color || "#fff",
				...local.style as JSX.CSSProperties,
			}}
			{ ...other }
		>{ local.children }</h1>
	);
};
