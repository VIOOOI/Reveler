import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const openRevelerRoute = createRoute();

export const OpenReveler: Component = () => {
	return ( 
		<div
			class="wh-screen flex-col-center"
		>
			<h1>Страница с открытием презентации</h1>
		</div>
	);
} ;
