import { Component, JSX, splitProps } from "solid-js";

type HeaderThreePropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLElement>

export const HeaderThree: Component<HeaderThreePropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<h3
			class={`${local.class} 
				fz-i1.25 
				m-y-i0.45
			`}
			style={{
				color: local.color || "#fff",
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</h3>
	);
};
