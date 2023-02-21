import { createRoute } from "atomic-router";
import { VoidComponent } from "solid-js";

export const documentationRoute = createRoute();

export const Documentation: VoidComponent = () => {
	return ( 
		<div class="w-100vw h-100vh flex-center">
			<h1 class="fz-i2 text-center z-2 text-shadow-lg">Документация находится в разработке</h1>
			<h1 
				class=" absolute top-50% left-50% text-light-600 w-full fz-i2.3 text-center"
				style={{
					transform: "translate(-50%, -110%)",
					"white-space": "nowrap",
				}}
			>Документация находится в разработке</h1>
		</div>
	);
};
