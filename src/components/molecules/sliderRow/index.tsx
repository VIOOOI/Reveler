import { Slide } from "@molecules/slide";
import { For, VoidComponent } from "solid-js";

type RowProps = {
	rows: RevelerRow,
}

export const Row: VoidComponent<RowProps> = ({ rows }) => {

	return ( 
		<div class="h-screen flex" >

			<For each={rows.slide} >{ slide =>
				<Slide slide={slide} />
			}</For>

		</div>
	);
};
