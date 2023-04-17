import { Accessor, Component, Setter, Show, createEffect, createSignal, on, onCleanup, onMount } from "solid-js";

import { $textReveler, setTextReveler } from "@atoms/dragZone/store";

import closeEditorIcon from "@public/closeEditor.svg?raw";
import downloadIcon from "@public/download.svg?raw";
import { useUnit } from "effector-solid";
import saveTextToFile from "@utils/saveTextToFile";

import { handleMouseDown } from "./function";

type Props = {
	isOpen: Accessor<boolean>,
	setIsOpen: Setter<boolean>,
}

export const Editor: Component<Props> = ({ isOpen, setIsOpen }) => {
	const [ editorWidth, setEditorWidth ] = createSignal(`${Math.round(window.innerWidth / 3)}px`);

	const revelerCode = useUnit($textReveler);
	const setReveler = useUnit(setTextReveler);
	let editorRef: HTMLDivElement;


	createEffect( on(isOpen, (props) => {
		if (props) {
			const isCreatedEditor = document.querySelector("#editor .iblize_textarea"); 
			if (!isCreatedEditor) {
				const iblize = new Iblize(editorRef, {
					language: "html",
					tabSize: 2,
					theme: "twilight",
				});
				iblize.setValue(revelerCode()); 
				iblize.onUpdate((value) => {
					setReveler(value);
				});
			}
		}
	}) );

	onMount(() => {
		const defaultCodeReveler = 
`<presentation>

  <slide>
    <div class="wh-screen flex-center">
      <h1>Hello world</h1>
    </div>
  </slide>

</presentation>
				`;
		if (revelerCode() == "")
			setReveler(defaultCodeReveler);
	});

	createEffect(() => {
		if (editorRef) {
			editorRef.style.width = editorWidth();
		}
	});

	return (
		<Show when={isOpen()}>
			<div
				class="h-screen flex fixed top-0 left-0 z-100 bg-blue-400"
				style={`width: ${editorWidth()}`}
			>
				<div id="editor" ref={editorRef} class="h-screen w-full"></div>
				<div class="w-5 relative h-screen bg-dark flex-center" >
					<div
						class="wh-5 absolute top-12 -right-8 cursor-pointer"
						onClick={() => {
							saveTextToFile({
								text: revelerCode(),
								fileName: "reveler",
							});
						}}
						innerHTML={downloadIcon}
					></div>
					<div
						class="wh-5 absolute top-2 -right-8 cursor-pointer"
						onClick={() => {setIsOpen(false);}}
						innerHTML={closeEditorIcon}
					></div>
					<div 
						class="w-2 h-15 rounded-full bg-white cursor-col-resize"
						onmousedown={event => {
							handleMouseDown({ event, editorWidth, setEditorWidth });
						}} 
					></div>
				</div>
			</div>
		</Show>
	);
};

