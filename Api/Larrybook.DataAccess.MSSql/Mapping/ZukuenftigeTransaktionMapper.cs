using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Mapping
{
    class ZukuenftigeTransaktionMapper
    {
        private KategorieRepository _kategorieRepository;

        public ZukuenftigeTransaktionMapper()
        {
            _kategorieRepository = new KategorieRepository();
        }

        public ZukuenftigeTransaktion MapFromDomainModel(ZukuenftigeTransaktionBiz wiederkehrendeTransaktionBiz)
        {
            var wiederkehrendeTransaktion = new ZukuenftigeTransaktion()
            {
                ZukuenftigeTransaktionId = wiederkehrendeTransaktionBiz.ZukuenftigeTransaktionId,
                Beschreibung = wiederkehrendeTransaktionBiz.Beschreibung,
                Betrag = wiederkehrendeTransaktionBiz.Betrag,
                EndDatum = wiederkehrendeTransaktionBiz.EndDatum,
                IsEinnahme = wiederkehrendeTransaktionBiz.IsEinnahme,
                StartDatum = wiederkehrendeTransaktionBiz.StartDatum,
                Frequenz = wiederkehrendeTransaktionBiz.Frequenz,
                KategorieId = wiederkehrendeTransaktionBiz.KategorieId
            };

            return wiederkehrendeTransaktion;
        }

        public ZukuenftigeTransaktionBiz MapToDomainModel(ZukuenftigeTransaktion wiederkehrendeTransaktion)
        {
            var mapper = new KategorieMapper();

            var wiederkehrendeTransaktionBiz = new ZukuenftigeTransaktionBiz()
            {
                ZukuenftigeTransaktionId = wiederkehrendeTransaktion.ZukuenftigeTransaktionId,
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
