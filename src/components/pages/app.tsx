import { Title } from "@molecules/title";
import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const appRoute = createRoute();

export const App: Component = () => {
	return (
		<div class="w-screen h-screen flex-center">
			<Title />
		</div>
	);
};
