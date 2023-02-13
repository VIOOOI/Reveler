import { JSX, splitProps, VoidComponent } from "solid-js";

type PicturePropsType = {
	color?: string,
	url: string,
} & JSX.HTMLAttributes<HTMLImageElement>

export const Picture: VoidComponent<PicturePropsType> = (props) => {
	const [ local ] = splitProps(props, [
		"class", "color", "style", "url",
	]);
	return (
		<img 
			src={local.url} 
			class={local.class || ""}
			alt=""
			style={{ ...local.style as JSX.CSSProperties }}
		/>
	);
};
