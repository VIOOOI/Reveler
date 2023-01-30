import { Slide } from "@molecules/slide";
import { modelView } from "@utils/effector-factory";
import { useUnit } from "effector-solid";
import { For, onMount } from "solid-js";

import { rowFactory } from "./model";

export const Row = modelView( rowFactory, () => {
	const model = rowFactory.useModel();
	const slide = useUnit(model.$slide);

	onMount(() => { model.getSlide(); });
	
	return ( 
		<div class="h-screen flex" >

			<For each={slide().slides} >{ sl =>
				<Slide slide={sl} />
			}</For>

		</div>
	);
});
