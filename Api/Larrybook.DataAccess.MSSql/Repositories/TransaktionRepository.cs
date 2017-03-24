using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    public class TransaktionRepository : IDisposable
    {

        private LarrybookContext _context;

        public TransaktionRepository()
        {
            _context = new LarrybookContext();
        }

        public List<TransaktionBiz> GetAll()
        {
            var transaktionen = _context.Transaktionen.ToList();
            var transaktionenBiz = new List<TransaktionBiz>();
            var mapper = new TransaktionMapper();

            foreach (var transaktion in transaktionen)
            {
                var transaktionBiz = mapper.MapToDomainModel(transaktion);
                transaktionenBiz.Add(transaktionBiz);
            }

            return transaktionenBiz;
        }

        public TransaktionBiz Update(TransaktionBiz transaktionBiz)
        {
            var mapper = new TransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            _context.Transaktionen.Attach(transaktion);
            var entry = _context.Entry(transaktion);
            entry.State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            return transaktionBiz;
        }

        public TransaktionBiz Insert(TransaktionBiz transaktionBiz)
        {
            var mapper = new TransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            var transaktionWithId = _context.Transaktionen.Add(transaktion);
            _context.SaveChanges();

            var transaktionBizWithId = mapper.MapToDomainModel(transaktionWithId);
            return transaktionBizWithId;
        }

        public bool Delete(int id)
        {
            var transaktion = _context.Transaktionen.Find(id);

            if (transaktion == null)
                return false;

            _context.Transaktionen.Remove(transaktion);
            _context.SaveChanges();

            transaktion = _context.Transaktionen.Find(id);

            if (transaktion == null)
                return true;

            return false;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).

                    if (_context != null)
                        _context.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~TransaktionRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
