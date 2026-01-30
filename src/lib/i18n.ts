import config from "@/config.json";
import ja from "@/language/ja.json";
import en from "@/language/en.json";

const languages = { ja, en } satisfies Record<string, typeof ja>;
type Language = keyof typeof languages;

type LeafStringPaths<T> = {
	[K in Extract<keyof T, string>]: T[K] extends string
		? K
		: T[K] extends Record<string, unknown>
			? `${K}.${LeafStringPaths<T[K]>}`
			: never;
}[Extract<keyof T, string>];

type Dict = Record<string, string | number>;

const getByPath = (obj: unknown, path: string): unknown => {
	return path.split(".").reduce<unknown>((acc, key) => {
		if (
			acc &&
			typeof acc === "object" &&
			key in (acc as Record<string, unknown>)
		) {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj);
};

const format = (template: string, vars?: Dict): string => {
	return template.replace(/\{(\w+)\}/g, (_, k: string) => {
		const v = vars?.[k];
		return v === undefined ? `{${k}}` : String(v);
	});
};

export const msg = <K extends LeafStringPaths<typeof ja>>(
	key: K,
	vars?: Dict,
): string => {
	const lang = (config.lang in languages ? config.lang : "ja") as Language;
	const value = getByPath(languages[lang], key as string);

	if (typeof value !== "string") return String(key);
	return format(value, vars);
};
