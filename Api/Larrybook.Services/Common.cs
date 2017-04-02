using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.Services
{
    public class Common
    {
        private static TransaktionRepository _transaktionRepo = new TransaktionRepository();
        private static ZukuenftigeTransaktionRepository _zukuenftigeTransaktionenRepo = new ZukuenftigeTransaktionRepository();
        private static object lockObject = new Object();


        public static void UpdateTransaktionenTables()
        {
            lock (lockObject)
            {
                var isUpToDate = false;

                while (!isUpToDate)
                {
                    var zukuenftigeTransaktionenToBeUpdated = _zukuenftigeTransaktionenRepo.GetOutdated();

                    if (zukuenftigeTransaktionenToBeUpdated.Count == 0)
                    {
                        isUpToDate = true;
                        continue;
                    }

                    foreach (var transaktion in zukuenftigeTransaktionenToBeUpdated)
                    {
                        var t = new TransaktionBiz()
                        {
                            Beschreibung = transaktion.Beschreibung,
                            Betrag = transaktion.Betrag,
                            IsEinnahme = transaktion.IsEinnahme,
                            KategorieId = transaktion.KategorieId,
                            Datum = transaktion.StartDatum
                        };

                        _transaktionRepo.Insert(t);

                        if (transaktion.Frequenz == 0)
                        {
                            _zukuenftigeTransaktionenRepo.Delete(transaktion.ZukuenftigeTransaktionId);
                        }
                        else
                        {
                            DateTime nextStartDatum;

                            if (transaktion.Frequenz == 1)
                                nextStartDatum = transaktion.StartDatum.AddDays(1);
                            else if (transaktion.Frequenz == 2)
                                nextStartDatum = transaktion.StartDatum.AddDays(7);
                            else
                                nextStartDatum = transaktion.StartDatum.AddMonths(1);

                            if (nextStartDatum.Date.CompareTo(transaktion.EndDatum.Date) > 0 && transaktion.EndDatum.Year != 2000)
                            {
                                _zukuenftigeTransaktionenRepo.Delete(transaktion.ZukuenftigeTransaktionId);
                            }
                            else
                            {
                                transaktion.StartDatum = nextStartDatum;
                                _zukuenftigeTransaktionenRepo.Update(transaktion);
                            }
                        }
                    }
                }
            }
        }
    }
}
