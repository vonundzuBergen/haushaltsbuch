using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Mapping
{
    class KategorieMapper
    {
        public KategorieBiz MapToDomainModel(Kategorie kategorie)
        {
            var kategorieBiz = new KategorieBiz()
            {
                KategorieId = kategorie.KategorieId,
                Name = kategorie.Name
            };

            return kategorieBiz;
        }

        public Kategorie MapFromDomainModel(KategorieBiz kategorieBiz)
        {
            var kategorie = new Kategorie()
            {
                KategorieId = kategorieBiz.KategorieId,
                Name = kategorieBiz.Name
            };

            return kategorie;
        }
    }
}
