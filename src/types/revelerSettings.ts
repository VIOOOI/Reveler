type PluginOption = Array<
	{
		name: string,
		additions?: Array<string>,
	} 
	| string
>

type ViewOptions = {
	bg?: string,
	text?: string,
}

type ArgsSetting = {
	plugins?: PluginOption
	control?: boolean,
	view?: ViewOptions,
}

export type SettingFunction = 
	(args: ArgsSetting) => void;
