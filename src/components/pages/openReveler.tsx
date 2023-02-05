import { DragZone } from "@atoms/dragZone";
import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const openRevelerRoute = createRoute();

export const OpenReveler: Component = () => {
	return ( 
		<div class="wh-screen flex-col-center" >
			<DragZone />
		</div>
	);
} ;
