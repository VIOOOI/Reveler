import { JSX, splitProps, VoidComponent } from "solid-js";

type PicturePropsType = {
	color?: string,
	url: string,
} & JSX.HTMLAttributes<HTMLElement>

export const Picture: VoidComponent<PicturePropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "style", "url",
	]);
	return (
		<div
			class={`${local.class} flex-center `}
			style={{ ...local.style as JSX.CSSProperties }}
			{...other}
		> 
			<img src={local.url} alt="" />
		</div>
	);
};
