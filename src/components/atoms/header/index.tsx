import { ParentComponent } from "solid-js";

type HeaderPropsType = {
	color?: string,
	url: string,
}

export const Header: ParentComponent<HeaderPropsType> = ({ children, color = "#171717", url }) => {
	return (
		<a 
			href={url} 
			class="no-underline"
		>
			<h1
				class="
					font-[Roboto]
					text-5xl underline decoration-8 underline-offset-8
					cursor-pointer
				"
				style={{
					color: color,
				}}
			>{ children }</h1>
		</a>
	);
};

