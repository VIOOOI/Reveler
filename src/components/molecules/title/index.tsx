import { Header } from "@atoms/header";
import { useUnit } from "effector-solid";
import { Component, For, onMount } from "solid-js";

import { getSkills, $skills } from "./store";

export const Title: Component = () => {
	const skills = useUnit($skills);
	onMount(() => getSkills());

	return (
		<div class="grid grid-cols-2 justofy-center items-center gap-x-5">
			<For each={skills()} >{ model => 
				<Header model={model} />
			}</For>
		</div>
	);
};
