using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql
{
    class LarrybookDbInitializer : DropCreateDatabaseAlways<LarrybookContext>
    {
        protected override void Seed(LarrybookContext context)
        {
            var kat1 = new Kategorie() { Name = "Auto" };
            var kat2 = new Kategorie() { Name = "Miete" };
            var kat3 = new Kategorie() { Name = "Lebensmittel" };
            var kat4 = new Kategorie() { Name = "Freizeit" };
            var kat5 = new Kategorie() { Name = "Studium" };
            var kat6 = new Kategorie() { Name = "Sonstiges" };
            var kat7 = new Kategorie() { Name = "Ebay-Verkäufe" };
            var kat8 = new Kategorie() { Name = "Gehalt" };

            context.Kategorien.Add(kat1);
            context.Kategorien.Add(kat2);
            context.Kategorien.Add(kat3);
            context.Kategorien.Add(kat4);
            context.Kategorien.Add(kat5);
            context.Kategorien.Add(kat6);
            context.Kategorien.Add(kat7);
            context.Kategorien.Add(kat8);

            var dateToday = DateTime.Now;
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Bahnticket",
                Betrag = 2.40m,
                Datum = dateToday,
                IsEinnahme = false,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "Transport"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Inspektion",
                Betrag = 325.25m,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Lohnsteuererrückzahlung 2016",
                Betrag = 456.50m,
                Datum = dateToday.AddDays(-18),
                IsEinnahme = true,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "Sondereinkommen"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Döner",
                Betrag = 4.50m,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat3
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Buch Einführung in die WI",
                Betrag = 22.50m,
                Datum = dateToday.AddDays(-2),
                IsEinnahme = false,
                Kategorie = kat5
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Wahlkampfspende",
                Betrag = 250.00m,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat6
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Rewe Einkauf",
                Betrag = 45.50m,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat3
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Computerspiel",
                Betrag = 59.99m,
                Datum = dateToday.AddDays(-8),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Waschanlage",
                Betrag = 14.99m,
                Datum = dateToday.AddDays(-7),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Verkauf alter DVDs",
                Betrag = 20.65m,
                Datum = dateToday.AddDays(-6),
                IsEinnahme = true,
                Kategorie = kat7
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Zinszahlung Girokonto",
                Betrag = 5.78m,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = true,
                Kategorie = kat6
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Kneipenbesuch",
                Betrag = 25.00m,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Parkticket",
                Betrag = 1.75m,
                Datum = dateToday.AddDays(-11),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Musik-CD",
                Betrag = 15,
                Datum = dateToday.AddDays(-10),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Bußgeld Geschwindigkeitsüberschreitung",
                Betrag = 15.00m,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Leuchtmittel vorne links",
                Betrag = 65,
                Datum = dateToday.AddDays(-17),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Konzertbesuch",
                Betrag = 45,
                Datum = dateToday.AddDays(-6),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Eis",
                Betrag = 1.5m,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = false,
                Kategorie = kat3
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Urlaub Mallorca",
                Betrag = 580,
                Datum = dateToday.AddDays(-15),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Tanzkurs",
                Betrag = 80,
                Datum = dateToday.AddDays(-2),
                IsEinnahme = false,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "Tankfüllung",
                Betrag = 58.59m,
                Datum = dateToday.AddDays(-9),
                IsEinnahme = false,
                Kategorie = kat1
            });

            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "Abschlussrate PKW",
                Betrag = 2080,
                IsEinnahme = false,
                Frequenz = 0,
                StartDatum = DateTime.Now.AddDays(3),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "Spotify",
                Betrag = 4.99m,
                IsEinnahme = false,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(5),
                EndDatum = DateTime.Now.AddDays(75),
                Kategorie = kat4
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "Lohn",
                Betrag = 2200,
                IsEinnahme = true,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(-4),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat8
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "Miete",
                Betrag = 650,
                IsEinnahme = false,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(-2),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat2
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "KFZ-Versicherung",
                Betrag = 85,
                IsEinnahme = false,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(1),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "Mittagsmenü Nr. 1 Kantine",
                Betrag = 3.99m,
                IsEinnahme = false,
                Frequenz = 1,
                StartDatum = DateTime.Now.AddDays(2),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat3
            });
            base.Seed(context);
        }
    }
}
