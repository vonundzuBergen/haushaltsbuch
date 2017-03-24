using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.Services
{
    public class WiederkehrendeTransaktionService
    {
        private WiederkehrendeTransaktionRepository _transaktionRepository;

        public WiederkehrendeTransaktionService()
        {
            _transaktionRepository = new WiederkehrendeTransaktionRepository();
        }

        public List<WiederkehrendeTransaktionBiz> GetAll()
        {
            return _transaktionRepository.GetAll();
        }

        public WiederkehrendeTransaktionBiz Update(WiederkehrendeTransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Update(transaktionBiz);
        }

        public WiederkehrendeTransaktionBiz Insert(WiederkehrendeTransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Insert(transaktionBiz);
        }

        public bool Delete(int id)
        {
            return _transaktionRepository.Delete(id);
        }

    }
}
