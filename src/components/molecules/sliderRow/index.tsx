import { Slide } from "@molecules/slide";
import { For, VoidComponent } from "solid-js";

type RowProps = {
	rows: RevelerRow,
	rowCount: number,
}

export const Row: VoidComponent<RowProps> = ({ rows, rowCount }) => {

	return ( 
		<div class="h-screen flex" >

			<For each={rows.slide} >{ (slide, index) =>
				<Slide 
					slide={slide} 
					rowCount={rowCount} 
					slideCount={index()} 
				/>
			}</For>

		</div>
	);
};
