import { Slide } from "@molecules/slide";
import { modelView } from "@utils/effector-factory";
import { useUnit } from "effector-solid";
import { createEffect, For, onMount, VoidComponent } from "solid-js";

import { rowFactory } from "./model";
type RowProps = {
	rows: RevelerRow,
}

// export const Row = modelView( rowFactory, () => {
// 	const model = rowFactory.useModel();
// 	const slide = useUnit(model.$slide);

// 	onMount(() => { model.getSlide(); });
// 	createEffect(() => {
// 		console.log(slide());
// 	});
	
// 	return ( 
// 		<div class="h-screen flex" >

// 			<For each={slide().slide} >{ sl =>
// 				<Slide slide={sl} />
// 			}</For>

// 		</div>
// 	);
// });

export const Row: VoidComponent<RowProps> = ({ rows }) => {

	return ( 
		<div class="h-screen flex" >

			<For each={rows.slide} >{ slide =>
				<Slide slide={slide} />
			}</For>

		</div>
	);
};
