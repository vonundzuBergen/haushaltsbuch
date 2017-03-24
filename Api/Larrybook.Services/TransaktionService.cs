using Larrybook.DataAccess.MSSql.Repositories;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.Services
{
    public class TransaktionService
    {
        private TransaktionRepository _transaktionRepository;

        public TransaktionService()
        {
            _transaktionRepository = new TransaktionRepository();
        }

        public List<TransaktionBiz> GetAll()
        {
            return _transaktionRepository.GetAll();
        }

        public TransaktionBiz Update(TransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Update(transaktionBiz);
        }

        public TransaktionBiz Insert(TransaktionBiz transaktionBiz)
        {
            return _transaktionRepository.Insert(transaktionBiz);
        }

        public bool Delete(int id)
        {
            return _transaktionRepository.Delete(id);
        }
    }
}
