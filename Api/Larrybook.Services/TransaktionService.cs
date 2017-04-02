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
            Common.UpdateTransaktionenTables();

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

        private void UpdateTransaktionenTables()
        {
            //Check for zukuenftige transaktionen with startdate today or in past 
            
            //create new transaktion and add to transaktionen table 

            //if was einmalig, delete from zukuenftige transaktionen 

            //else check if there is another transaktion to come 

            //if yes, adjust start date to date of next transaktion 

            //if no delete 
        }
    }
}
