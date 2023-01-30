
import { Component, JSX, splitProps } from "solid-js";

type ListPropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLUListElement>

type ListComponent<T> = Component<T> & { Item: Component<ItemPropsType> };

const List: ListComponent<ListPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<ul
			class={`${local.class} p-0 m-0`}
			style={{
				"list-style-type": "none",
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</ul>
	);
};

type ItemPropsType = {
	color?: string,
} & JSX.HTMLAttributes<HTMLLIElement>

const Item: Component<ItemPropsType> = (props) => {
	const [ local, other ] = splitProps(props, [
		"class", "color", "children", "style",
	]);
	return (
		<li
			class={`
				fz-i1.3 font-bold
				${local.class || ""} 
			`}
			style={{
				...local.style as JSX.CSSProperties,
			}}
			{...other}
		>{ local.children }</li>
	);
};

List.Item = Item;
export default List;
