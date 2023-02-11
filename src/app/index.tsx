import "uno.css";
import { render } from "solid-js/web";
import { createRoutesView, RouterProvider } from "atomic-router-solid";

import { App, appRoute } from "@pages/app";
import { NotFound } from "@pages/notFound";
import { RevelerViewer, revelerViewerRoute } from "@pages/revelerViewer";
import { RevelerConstructor, revelerConstructorRoute } from "@pages/constructor";
import { OpenReveler, openRevelerRoute } from "@pages/openReveler";

import "./style.scss";

import { router } from "./routing";
import { RevelerLayout } from "./layout/revelerLayout";


const RouterView = createRoutesView({
	routes: [
		{ route: appRoute, view: App },
		{ route: revelerViewerRoute, view: RevelerViewer, layout: RevelerLayout },
		{ route: openRevelerRoute, view: OpenReveler },
		{ route: revelerConstructorRoute, view: RevelerConstructor },
	],
	otherwise: NotFound,
});


render(() => (
	<RouterProvider router={router} >
		<RouterView />
	</RouterProvider>
), document.getElementById("root") as HTMLElement);

