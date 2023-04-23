import { Accessor, Component, Setter, Show, createSignal } from "solid-js";
import { ContextMenu, ContextMenuItem } from "@molecules/contextMenu";
import closeEditorIcon from "@public/closeEditor.svg?raw";
import downloadIcon from "@public/download.svg?raw";
import saveTextToFile from "@utils/saveTextToFile";
import { useUnit } from "effector-solid";
import { $textReveler } from "@atoms/dragZone/store";

import insertTextAtCursor from "@utils/insertTextAtCursor";

import { useEditorInitialization } from "./useEditorInitialization";
import { useEditorResize } from "./useEditorResize";
import { useEditorContextMenu } from "./useEditorContextMenu";

type Props = {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
};
const menuItems = [
	{
		label: "Вставить слайд",
		onClick: () => {
			insertTextAtCursor( "<slide>\n\n</slide>");
		},
	},
	{
		label: "Вставить пустую группу",
		onClick: () => {
			insertTextAtCursor( "<group>\n  \n</group>");
		},
	},
	{
		label: "Вставить группу",
		onClick: () => {
			insertTextAtCursor( 
				"<group>\n  <slide>\n    \n  </slide>\n</group>",
			);
		},
	},
	{
		label: "Вставить шаблон презентации",
		onClick: () => {
			insertTextAtCursor( 
				"<presentation>\n  <slide>\n    <h1>Hello world</h1>\n  </slide>\n</presentation>",
			);
		},
	},
] as Array<ContextMenuItem>;

export const Editor: Component<Props> = ({ isOpen, setIsOpen }) => {
	const [ editorWidth, setEditorWidth ] = createSignal(
		`${Math.round(window.innerWidth / 3)}px`,
	);
	const [ menuPosition, setMenuPosition ] = createSignal({ x: 0, y: 0 });
	const [ menuVisible, setMenuVisible ] = createSignal(false);

	const revelerCode = useUnit($textReveler);
	let editorRef: HTMLDivElement;

	useEditorInitialization(isOpen, setIsOpen, editorRef);
	useEditorContextMenu(setMenuPosition, setMenuVisible);
	const handleResize = useEditorResize(editorRef, editorWidth, setEditorWidth);

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
					<div class="w-5 relative h-screen bg-dark flex-center">
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
							onClick={() => { setIsOpen(false); }}
							innerHTML={closeEditorIcon}
						></div>
						<div
							class="w-2 h-15 rounded-full bg-white cursor-col-resize"
							onmousedown={handleResize}
						></div>
					</div>
				</div>
			</Show>
		</>
	);
};
