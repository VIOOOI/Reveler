import { $textReveler, setTextReveler } from "@atoms/dragZone/store";
import { Slider } from "@organisms/slider";
import loadScript from "@utils/loadScript";
import { createRoute } from "atomic-router";
import { useUnit } from "effector-solid";
// import Iblize from "iblize/iblize";

import { Component, Show, createEffect, createSignal, on, onMount } from "solid-js";

import editorIcon from "@public/editor.svg?raw";
import closeEditorIcon from "@public/closeEditor.svg?raw";
import downloadIcon from "@public/download.svg?raw";
import saveTextToFile from "@utils/saveTextToFile";
import { Editor } from "@molecules/editor";

export const revelerViewerRoute = createRoute();

export const RevelerViewer: Component = () => {
	const [ isEditor, setIsEditor ] = createSignal(false);
	const revelerCode = useUnit($textReveler);
	const setReveler = useUnit(setTextReveler);



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
