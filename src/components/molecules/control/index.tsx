import { ControlButton } from "@atoms/controlButtom";
import { splitProps, VoidComponent } from "solid-js";

type ControlPropsType = {
	class?: string,
}

export const Control: VoidComponent<ControlPropsType> = (props) => {
	const [ local ] = splitProps(props, [ "class" ]);
	return (
		<div 
			id="control"
			class={local.class + " absolute z-100 b-i2 r-i2 flex flex-col gap-5 wh-25"}

		>
			<ControlButton direction="top" />
			<div class="flex justify-between">
				<ControlButton direction="left" />
				<ControlButton direction="right" />
			</div>
			<ControlButton direction="bottom" />
		</div>
	);
};
