export interface IKeyValue {
    key: string;
    value: string;
}

export function getString(key: string): string {
    return map.get(key) || key;
}

const strings: IKeyValue[] = [
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
    { key: "persons", value: "Osobe" },
    { key: "basicData", value: "Osnovni podaci" },
    { key: "firstName", value: "Ime" },
    { key: "lastName", value: "Prezime" },
    { key: "jmbg", value: "JMBG" },
    { key: "birthDate", value: "Datum rođenja" },
    { key: "stayData", value: "Podaci o boravku" },
    { key: "startDate", value: "Datum dolaska" },
    { key: "endDate", value: "Datum odlaska" },
    { key: "creationDate", value: "Datum unosa" },
    { key: "currentStatus", value: "Trenutni status osobe" },
    { key: "active", value: "Aktivan" },
    { key: "unactive", value: "Neaktivan" },
    { key: "activeTooltip", value: "Osoba je trenutno smještena u ustanovi." },
    { key: "unactiveTooltip", value: "Osoba je bila smještena u ustanovi, ali je njen boravak završio." },
    { key: "deactivatePerson", value: "Deaktiviraj osobu" },
    { key: "dormatoryData", value: "Podaci o smještaju" },
    { key: "currentFloor", value: "Kat na kojemu je osoba trenutno smještena" },
    { key: "room", value: "Soba" },
    { key: "goToExternalRoomManagement", value: "Idi na vanjsko upravljanje smještajem" },
    { key: "goToAdvancedEdit", value: "Idi na napredno uređivanje" },
    { key: "save", value: "Spremi" },
    { key: "cancel", value: "Odustani" },
    { key: "personData", value: "Podaci o osobi" },
    { key: "activePersonDetails", value: "Aktivna osoba je osoba koja je trenutno smještena u ustanovi." },
    { key: "unactivePersonDetails", value: "Neaktivna osoba je osoba čiji je boravak u ustanovi završio." },
    { key: "changeStatusPersonText1", value: "Za prebacivanje osobe iz statusa aktivne u neaktivnu potrebno je kliknuti gumb: " },
    { key: "changeStatusPersonText2", value: "Ukoliko ne navedete 'Datum odlaska' spremit će se trenutni datum kao datum odlaska osobe iz ustanove." },
    { key: "unactivePersons", value: "Prikaži neaktivne osobe" },
    { key: "areYouSure", value: "Jeste li sigurni?" },
    { key: "questionDeactivatePerson", value: "Želite li deaktivirati osobu s datumom: " },
    { key: "yes", value: "Da" },
    { key: "no", value: "Ne" },
];

const map = new Map(strings.map(obj => [obj.key, obj.value]));