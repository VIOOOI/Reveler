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

			<For each={slide().slides} >{ () =>
				<div class="min-w-screen h-screen flex-col-center" >
					<h1 class="font-[Roboto] text-6xl m-0 text-white" >Hello Reveler</h1>
					<h2 class="font-[Roboto] text-4xl text-white" >Hello Reveler</h2>
				</div>
			}</For>

		</div>
	);
});
