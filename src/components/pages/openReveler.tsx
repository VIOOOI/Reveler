import { DragZone } from "@atoms/dragZone";
import { createRoute } from "atomic-router";

import { Component, onMount } from "solid-js";

export const openRevelerRoute = createRoute();

export const OpenReveler: Component = () => {
	onMount(() => {
		document.title = "Открыть презентацию";
	});
	return ( 
		<div class="wh-screen flex-col-center">
			<DragZone />
		</div>
	);
} ;
