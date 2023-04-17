import { createEventListener } from "@solid-primitives/event-listener";
import { Accessor, Component, createEffect, createSignal, For, onCleanup, Show } from "solid-js";

type ContextMenuItem = {
  label: string;
  onClick: () => void;
}

type ContextMenuProps = {
  items: ContextMenuItem[];
  position: Accessor<{ x: number; y: number }>;
  visible: Accessor<boolean>;
  onClose: () => void;
}

export const ContextMenu: Component<ContextMenuProps> = ({ items, position, onClose, visible }) => {
	const handleClick = (item: ContextMenuItem) => {
		item.onClick();
		onClose();
	};

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
					<div
						class="cursor-pointer text-white font-bold text-Roboto px-12 py-4 rounded-lg hover:bg-neutral-800"
						onClick={() => handleClick(item)}
					> { item.label } </div>
				}</For>
			</div>
		</Show>
	);
};
