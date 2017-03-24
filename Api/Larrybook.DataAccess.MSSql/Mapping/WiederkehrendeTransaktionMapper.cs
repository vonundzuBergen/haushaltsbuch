using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Mapping
{
    class WiederkehrendeTransaktionMapper
    {
        private KategorieRepository _kategorieRepository;

        public WiederkehrendeTransaktionMapper()
        {
            _kategorieRepository = new KategorieRepository();
        }

        public WiederkehrendeTransaktion MapFromDomainModel(WiederkehrendeTransaktionBiz wiederkehrendeTransaktionBiz)
        {
            var wiederkehrendeTransaktion = new WiederkehrendeTransaktion()
            {
                WiederkehrendeTransaktionId = wiederkehrendeTransaktionBiz.WiederkehrendeTransaktionId,
                Beschreibung = wiederkehrendeTransaktionBiz.Beschreibung,
                Betrag = wiederkehrendeTransaktionBiz.Betrag,
                EndDatum = wiederkehrendeTransaktionBiz.EndDatum,
                IsEinnahme = wiederkehrendeTransaktionBiz.IsEinnahme,
                StartDatum = wiederkehrendeTransaktionBiz.StartDatum,
                Frequenz = wiederkehrendeTransaktionBiz.Frequenz
            };

            return wiederkehrendeTransaktion;
        }

        public WiederkehrendeTransaktionBiz MapToDomainModel(WiederkehrendeTransaktion wiederkehrendeTransaktion)
        {
            var mapper = new KategorieMapper();

            var wiederkehrendeTransaktionBiz = new WiederkehrendeTransaktionBiz()
            {
                WiederkehrendeTransaktionId = wiederkehrendeTransaktion.WiederkehrendeTransaktionId,
                Beschreibung = wiederkehrendeTransaktion.Beschreibung,
                Betrag = wiederkehrendeTransaktion.Betrag,
                EndDatum = wiederkehrendeTransaktion.EndDatum,
                IsEinnahme = wiederkehrendeTransaktion.IsEinnahme,
                StartDatum = wiederkehrendeTransaktion.StartDatum,
                Frequenz = wiederkehrendeTransaktion.Frequenz,
                KategorieId = wiederkehrendeTransaktion.KategorieId
            };

            return wiederkehrendeTransaktionBiz;
        }
    }
}
