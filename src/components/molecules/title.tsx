import { Header } from "@atoms/header";
import { Component } from "solid-js";

export const Title: Component = () => {
	return (
		<div class="flex gap-x-5">
			<Header color="#6689C5" url="https://www.solidjs.com/">SolidJS</Header>
			<Header color="#191919" url="https://github.com/unocss/unocss">UnoCSS</Header>
			<Header color="#E58B20" url="https://effector.dev/">Effector</Header>
		</div>
	);
};
