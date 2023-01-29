import { Slider } from "@organisms/slider";
import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const revelerViewerRoute = createRoute();

export const RevelerViewer: Component = () => <Slider /> ;
