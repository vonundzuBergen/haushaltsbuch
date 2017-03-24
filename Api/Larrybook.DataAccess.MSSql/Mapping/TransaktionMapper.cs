using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Mapping
{
    class TransaktionMapper
    {
        private KategorieRepository _kategorieRepository;

        public TransaktionMapper()
        {
            _kategorieRepository = new KategorieRepository();
        }

        public Transaktion MapFromDomainModel(TransaktionBiz transaktionBiz)
        {
            var transaktion = new Transaktion()
            {
                TransaktionId = transaktionBiz.TransaktionId,
                Beschreibung = transaktionBiz.Beschreibung,
                Betrag = transaktionBiz.Betrag,
                Datum = transaktionBiz.Datum,
                IsEinnahme = transaktionBiz.IsEinnahme,
                KategorieId = transaktionBiz.KategorieId
            };

            return transaktion;
        }

        public TransaktionBiz MapToDomainModel(Transaktion transaktion)
        {
            var mapper = new KategorieMapper();

            var transaktionBiz = new TransaktionBiz()
            {
                TransaktionId = transaktion.TransaktionId,
                Beschreibung = transaktion.Beschreibung,
                Betrag = transaktion.Betrag,
                Datum = transaktion.Datum,
                IsEinnahme = transaktion.IsEinnahme,
                KategorieId = transaktion.KategorieId
            };

            return transaktionBiz;
        }
    }
}
