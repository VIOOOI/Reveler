import { Accessor, Component, Setter, Show, createEffect, createSignal, on, onCleanup, onMount } from "solid-js";

import { $textReveler, setTextReveler } from "@atoms/dragZone/store";
import { ContextMenu } from "@molecules/contextMenu";

import closeEditorIcon from "@public/closeEditor.svg?raw";
import downloadIcon from "@public/download.svg?raw";
import { useUnit } from "effector-solid";
import saveTextToFile from "@utils/saveTextToFile";
import debounce from "@utils/debounce";

import { createEventListener } from "@solid-primitives/event-listener";

import { defaultCodeReveler, handleMouseDown, menuItems } from "./function";

type Props = {
	isOpen: Accessor<boolean>,
	setIsOpen: Setter<boolean>,
}

export const Editor: Component<Props> = ({ isOpen, setIsOpen }) => {
	const [ editorWidth, setEditorWidth ] = createSignal(
		`${Math.round( window.innerWidth / 3 )}px`,
	);
	const [ menuPosition, setMenuPosition ] = createSignal({ x: 0, y: 0 });
	const [ menuVisible, setMenuVisible ] = createSignal(false);

	const revelerCode = useUnit($textReveler);
	const setReveler = useUnit(setTextReveler);
	let editorRef: HTMLDivElement;


	createEffect( on(isOpen, (props) => {
		if (props) {
			const isCreatedEditor = document.querySelector("#editor .iblize_textarea"); 
			if (!isCreatedEditor) {
				window["editor"] = new Iblize(editorRef, {
					language: "html",
					tabSize: 2,
				});
				document.querySelector(".iblize-dark").style.background = "#171717";
				window["editor"].setValue(revelerCode()); 

				const updateFunction = (message: string): void => {
					setReveler(message);
				};
				const debounceUpdateFunction = debounce(updateFunction);
				window["editor"].onUpdate(debounceUpdateFunction);
			}
		}
	}) );

	onMount(() => {
		revelerCode() == "" ? setReveler(defaultCodeReveler) : null;

		createEventListener( 
			document.querySelector("#slider"),
			"click",
			() => setIsOpen(false),
		);
	});

	createEffect(() => {
		editorRef ? editorRef.style.width = editorWidth() : null;
	});

	createEffect(() => {
		const handleContextMenu = (event: MouseEvent) => {
			event.preventDefault();
			setMenuPosition({ x: event.clientX, y: event.clientY });
			setMenuVisible(true);
		};

		createEventListener( window, "contextmenu", handleContextMenu );
		createEventListener( window, "click", () => setMenuVisible(false) );
	});

	return (
		<>
			<Show when={isOpen()}>
				<div
					class="h-screen flex fixed top-0 left-0 z-100 bg-blue-400"
					style={`width: ${editorWidth()}`}
				>
					<ContextMenu 
						items={menuItems} 
						position={menuPosition} 
						onClose={() => setMenuVisible(false)}
						visible={menuVisible}
					/>
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
		</>
	);
};

