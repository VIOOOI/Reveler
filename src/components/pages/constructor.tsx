import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const revelerConstructorRoute = createRoute();

export const RevelerConstructor: Component = () => {
	return ( 
		<div class="wh-screen flex-col-center">
			<h1>Конструктор</h1>
		</div>
	);
};

