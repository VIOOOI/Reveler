import { Slider } from "@organisms/slider";
import { createRoute } from "atomic-router";
// import Iblize from "iblize/iblize";

import { Component, createSignal } from "solid-js";

import editorIcon from "@public/editor.svg?raw";
import { Editor } from "@molecules/editor/editor";

export const revelerViewerRoute = createRoute();

export const RevelerViewer: Component = () => {
	const [ isEditor, setIsEditor ] = createSignal(false);

	return ( 
		<>
			<Editor isOpen={isEditor} setIsOpen={setIsEditor} />
			<div 
				class="fixed top-5 left-5 rounded-md z-50"
				onClick={() => {setIsEditor(true);}}
				innerHTML={editorIcon}
			> </div>
			<Slider /> 
		</>
	);
};
