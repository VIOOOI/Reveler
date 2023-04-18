import { ContextMenuItem } from "@molecules/contextMenu";
import insertTextAtCursor from "@utils/insertTextAtCursor";

export default [
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
