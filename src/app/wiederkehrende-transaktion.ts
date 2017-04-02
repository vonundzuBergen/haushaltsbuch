export class WiederkehrendeTransaktion {
    ZukuenftigeTransaktionId?: number;
    IsEinnahme: boolean;
    Betrag: number;
    KategorieId: number;
    Beschreibung: string;
    StartDatum: Date;
    EndDatum: Date;
    Frequenz: number;
}