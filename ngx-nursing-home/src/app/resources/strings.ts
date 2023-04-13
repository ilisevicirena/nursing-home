export interface KeyValue {
    key: string;
    value: string;
}

export function getString(key: string): string {
    return map.get(key) || key;
}

const strings: KeyValue[] = [
    { key: "dashboard", value: "Početna" },
];

const map = new Map(strings.map(obj => [obj.key, obj.value]));