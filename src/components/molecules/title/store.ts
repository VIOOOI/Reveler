import { headerFactory, OptionHeaderFactory } from "@atoms/header/model";
import { createEffect, createEvent, createStore, restore, sample } from "effector";

type SkilsFactoryType = Array<ReturnType<typeof headerFactory.createModel>>;

export const getSkills = createEvent();

const convertSkillsFx = 
	createEffect<OptionHeaderFactory[], SkilsFactoryType>
	((skills): SkilsFactoryType => {
		return skills.map( item => headerFactory.createModel(item) );
	});

const $rawSkills = createStore<OptionHeaderFactory[]>([
	{ name: "SolidJS", color: "#6689C5" },
	{ name: "UnoCSS", color: "#191919" },
	{ name: "EffectorJS", color: "#E58B20" },
	{ name: "Atomic-router", color: "#74B784" },
]);

export const $skills = restore(convertSkillsFx, []);

sample({
	clock: getSkills,
	source: $rawSkills,
	target: convertSkillsFx,
});
