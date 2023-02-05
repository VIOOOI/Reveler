import { Control } from "@molecules/control";
import { ParentComponent } from "solid-js";

export const RevelerLayout: ParentComponent = ({ children }) => {
	return (
		<div class="relative"> 
			<Control />
			{ children }
		</div>
	);
};
