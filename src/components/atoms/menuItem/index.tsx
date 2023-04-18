import { ContextMenuItem } from "@molecules/contextMenu";
import { Component, createSignal, For, Show } from "solid-js";

import menuItemIcon from "@public/menu/menuitem.svg?raw";

interface MenuItemProps {
  item: ContextMenuItem;
  onClose: () => void;
}

export const MenuItem: Component<MenuItemProps> = ({ item, onClose }) => {
	const [ subMenuVisible, setSubMenuVisible ] = createSignal(false);

	const handleMouseEnter = () => {
		if (item.children) setSubMenuVisible(true);
	};

	const handleMouseLeave = () => {
		if (item.children) setSubMenuVisible(false);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			class="
			relative group text-white
			shadow-lg bg-dark
			border-2px border-white
			first:rounded-t-lg
			last:rounded-b-lg
			"
		>
			<div
				onClick={() => {
					if (item.onClick) item.onClick();
					onClose();
				}}
				class="w-full text-left flex justify-start items-center gap-x-3 px-4 py-4 text-sm"
			>
				<Show when={item.icon}>
					<span
						class="inline-flex items-center justify-center"
						innerHTML={item.icon}
					></span>
				</Show>
				<Show when={!item.icon}>
					<span
						class="inline-flex items-center justify-center"
						innerHTML={menuItemIcon}
					></span>
				</Show>
				{item.label}
			</div>
			<Show when={item.children && subMenuVisible()}>
				<div 
					class="absolute w-15rem left-95% mt-[-0.5rem] bg-white shadow-lg rounded-xl"
					classList={{
						"top-0": item.children.length <= 3,
						"-top-30%": item.children.length > 3 && item.children.length < 7,
						"-top-50%": item.children.length > 7,
					}}
				>
					<For each={item.children} >{(child) => 
						<MenuItem item={child} onClose={onClose} />
					}</For>
				</div>
			</Show>
		</div>
	);
};
