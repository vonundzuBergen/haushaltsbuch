export class Transaktion {
    TransaktionId?: number;
    IsEinnahme: boolean;
    Betrag: number;
    Beschreibung: string;
    Datum: Date;
    KategorieId: number;
}