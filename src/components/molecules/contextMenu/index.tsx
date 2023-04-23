import { MenuItem } from "@atoms/menuItem";
import { createEventListener } from "@solid-primitives/event-listener";
import { Accessor, Component, createEffect, For, Show } from "solid-js";

export type ContextMenuItem = {
  label: string;
  onClick?: () => void;
	children?: ContextMenuItem[];
	icon?: string;
}

type ContextMenuProps = {
  items: ContextMenuItem[];
  position: Accessor<{ x: number; y: number }>;
  visible: Accessor<boolean>;
  onClose: () => void;
}

export const ContextMenu: Component<ContextMenuProps> = ({ items, position, onClose, visible }) => {

	createEffect(() => {
		if (visible())
			createEventListener(window, "click", (event: MouseEvent) => {
				event.stopPropagation();
				onClose();
			});
	});

	return (
		<Show when={visible()}>
			<div
				class="fixed bg-neutral-900 rounded-lg p-0"
				style={`top: ${position().y}px; left: ${position().x}px; z-index: 999;`}
			>
				<For each={items}>{item => 
					<MenuItem item={item} onClose={onClose} />
				}</For>
			</div>
		</Show>
	);
};
