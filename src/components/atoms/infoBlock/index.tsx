
// import { setBackground } from "@atoms/cursor/store";

import { JSX, ParentComponent, splitProps } from "solid-js";

type InfoBlockPropsType = {
	color: "black" | "white",
} & JSX.HTMLAttributes<HTMLDivElement>

export const InfoBlock: ParentComponent<InfoBlockPropsType> 
	= (props) => {
		const [ local, other ] = splitProps(props, [ 
			"color", "class", "children",
		]);

		return (
			<div 
				class={local.class + " w-full h-full flex-center rounded-md"}
				classList={{
					"bg-neutral-900 text-white": local.color == "black",
					"bg-white text-neutral-900": local.color == "white",
				}}
				// onMouseOver={() => setBackground(local.color == "white" ? "#fff" : "#000")}
				// onMouseLeave={() => setBackground("#000")}
				{ ...other }
			>
				{ local.children }
			</div>
		);
	};
