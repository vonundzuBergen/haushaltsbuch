using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    public class ZukuenftigeTransaktionRepository : IDisposable
    {
        private LarrybookContext _context;

        public ZukuenftigeTransaktionRepository()
        {
            _context = new LarrybookContext();
        }

        public List<ZukuenftigeTransaktionBiz> GetAll()
        {
            var transaktionen = _context.ZukuenftigeTransaktionen.ToList();
            var transaktionenBiz = new List<ZukuenftigeTransaktionBiz>();

            var mapper = new ZukuenftigeTransaktionMapper();

            foreach (var transaktion in transaktionen)
            {
                var transaktionBiz = mapper.MapToDomainModel(transaktion);
                transaktionenBiz.Add(transaktionBiz);
            }

            return transaktionenBiz;
        }

        public ZukuenftigeTransaktionBiz Update(ZukuenftigeTransaktionBiz transaktionBiz)
        {
            var mapper = new ZukuenftigeTransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            _context.ZukuenftigeTransaktionen.Attach(transaktion);
            var entry = _context.Entry(transaktion);
            entry.State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            return transaktionBiz;
        }

        public ZukuenftigeTransaktionBiz Insert(ZukuenftigeTransaktionBiz transaktionBiz)
        {
            var mapper = new ZukuenftigeTransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            var transaktionWithId =_context.ZukuenftigeTransaktionen.Add(transaktion);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }

            var transaktionBizWithId = mapper.MapToDomainModel(transaktionWithId);
            return transaktionBizWithId;
        }

        public bool Delete(int id)
        {
            var transaktion = _context.ZukuenftigeTransaktionen.Find(id);

            if (transaktion == null)
                return false;

            _context.ZukuenftigeTransaktionen.Remove(transaktion);
            _context.SaveChanges();

            transaktion = _context.ZukuenftigeTransaktionen.Find(id);

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
        // ~WiederkehrendeTransaktionRepository() {
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
