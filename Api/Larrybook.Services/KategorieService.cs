using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.Services
{
    public class KategorieService
    {
        private KategorieRepository _kategorieRepository;

        public KategorieService()
        {
            _kategorieRepository = new KategorieRepository();
        }

        public IQueryable<KategorieBiz> Get(int id)
        {
            return _kategorieRepository.GetAll().Where(x => x.KategorieId == id).AsQueryable();
        }

        public List<KategorieBiz> GetAll()
        {
            return _kategorieRepository.GetAll();
        }

        public KategorieBiz Insert(KategorieBiz kategorieBiz)
        {
            return _kategorieRepository.Insert(kategorieBiz);
        }

        public KategorieBiz Update(KategorieBiz kategorieBiz)
        {
            return _kategorieRepository.Update(kategorieBiz);
        }

        public bool Delete(int id)
        {
            return _kategorieRepository.Delete(id);
        }
    }
}
