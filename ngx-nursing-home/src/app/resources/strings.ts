export interface KeyValue {
    key: string;
    value: string;
}

export function getString(key: string): string {
    return map.get(key) || key;
}

const strings: KeyValue[] = [
    { key: "dashboard", value: "Početna" },
    { key: "roomManagement", value: "Upravljanje sobama" },
    { key: "floors", value: "Katevi" },
    { key: "rooms", value: "Sobe" },
    { key: "id", value: "Šifra" },
    { key: "name", value: "Naziv" },
    { key: "capacity", value: "Kapacitet" },
    { key: "floor", value: "Kat" },
    { key: "saveSuccess", value: "Uspješno spremljeno!" },
    { key: "saveError", value: "Pogreška prilikom spremanja!" },
    { key: "noRoomsForSelectedFloor", value: "Nema spremljenih soba za odabrani kat!" },
];

const map = new Map(strings.map(obj => [obj.key, obj.value]));