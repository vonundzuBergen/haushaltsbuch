using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.Services
{
    public class ZukuenftigeTransaktionService
    {
        private ZukuenftigeTransaktionRepository _transaktionRepository;

        public ZukuenftigeTransaktionService()
        {
            _transaktionRepository = new ZukuenftigeTransaktionRepository();
        }

        public List<ZukuenftigeTransaktionBiz> GetAll()
        {
            Common.UpdateTransaktionenTables();

            return _transaktionRepository.GetAll();
        }

        public ZukuenftigeTransaktionBiz Update(ZukuenftigeTransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Update(transaktionBiz);
        }

        public ZukuenftigeTransaktionBiz Insert(ZukuenftigeTransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Insert(transaktionBiz);
        }

        public bool Delete(int id)
        {
            return _transaktionRepository.Delete(id);
        }

    }
}
