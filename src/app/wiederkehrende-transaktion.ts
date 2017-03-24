export class WiederkehrendeTransaktion {
    id?: number;
    isEinnahme: boolean;
    betrag: number;
    kategorie: string;
    beschreibung: string;
    startYear: number;
    startMonth: number;
    startDay: number;
    frequenz: number;
    endYear: number;
    endMonth: number;
    endDay: number;
}