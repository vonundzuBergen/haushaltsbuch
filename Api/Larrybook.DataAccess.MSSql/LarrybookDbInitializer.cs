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
            var kat1 = new Kategorie() { Name = "Kateg1" };
            var kat2 = new Kategorie() { Name = "Kateg324" };
            var kat3 = new Kategorie() { Name = "Kategorie2345" };
            var kat4 = new Kategorie() { Name = "Kategor324" };
            var kat5 = new Kategorie() { Name = "Kategorie6432" };
            var kat6 = new Kategorie() { Name = "Katego34c" };
            var kat7 = new Kategorie() { Name = "Katego87z" };

            context.Kategorien.Add(kat1);
            context.Kategorien.Add(kat2);
            context.Kategorien.Add(kat3);
            context.Kategorien.Add(kat4);
            context.Kategorien.Add(kat5);
            context.Kategorien.Add(kat6);
            context.Kategorien.Add(kat7);

            var dateToday = DateTime.Now;
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvsvfafds",
                Betrag = 11.88m,
                Datum = dateToday,
                IsEinnahme = true,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "mdsaasuuc"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvsvfafds",
                Betrag = 32.45m,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = false,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "23f"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshvfafds",
                Betrag = 24.56m,
                Datum = dateToday.AddDays(-4),
                IsEinnahme = true,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "azusdbf"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvs vfafds",
                Betrag = 255,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "pffsa"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvs fafds",
                Betrag = 13,
                Datum = dateToday.AddDays(-2),
                IsEinnahme = false,
                Kategorie = context.Kategorien.Add(new Kategorie()
                {
                    Name = "asfzv"
                })
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvsfafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvsafds",
                Betrag = 8.78m,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = false,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvsafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-8),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy asrvs <vfafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-7),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxy aafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-6),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 25,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5.3m,
                Datum = dateToday.AddDays(-11),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 15,
                Datum = dateToday.AddDays(-10),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-1),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-7),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-6),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = true,
                Kategorie = kat4
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-5),
                IsEinnahme = true,
                Kategorie = kat7
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5.56m,
                Datum = dateToday.AddDays(-2),
                IsEinnahme = true,
                Kategorie = kat1
            });
            context.Transaktionen.Add(new Transaktion()
            {
                Beschreibung = "fdshabhhvxafds",
                Betrag = 5,
                Datum = dateToday.AddDays(-9),
                IsEinnahme = true,
                Kategorie = kat6
            });

            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 13,
                IsEinnahme = false,
                Frequenz = 0,
                StartDatum = DateTime.Now.AddDays(3),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 1,
                StartDatum = DateTime.Now.AddDays(5),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat4
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 1,
                StartDatum = DateTime.Now.AddDays(11),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat3
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = false,
                Frequenz = 2,
                StartDatum = DateTime.Now.AddDays(10),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat2
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 1,
                StartDatum = DateTime.Now.AddDays(1),
                EndDatum = DateTime.Now.AddDays(50),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 0,
                StartDatum = DateTime.Now.AddDays(2),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(5),
                EndDatum = new DateTime(2000, 1, 1),
                Kategorie = kat1
            });
            context.ZukuenftigeTransaktionen.Add(new ZukuenftigeTransaktion()
            {
                Beschreibung = "halofsdhbsda",
                Betrag = 34,
                IsEinnahme = true,
                Frequenz = 3,
                StartDatum = DateTime.Now.AddDays(2),
                EndDatum = DateTime.Now.AddDays(35),
                Kategorie = kat1
            });

            base.Seed(context);
        }
    }
}
