using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    public class WiederkehrendeTransaktionRepository : IDisposable
    {
        private LarrybookContext _context;

        public WiederkehrendeTransaktionRepository()
        {
            _context = new LarrybookContext();
        }

        public List<WiederkehrendeTransaktionBiz> GetAll()
        {
            var transaktionen = _context.WiederkehrendeTransaktionen.ToList();
            var transaktionenBiz = new List<WiederkehrendeTransaktionBiz>();

            var mapper = new WiederkehrendeTransaktionMapper();

            foreach (var transaktion in transaktionen)
            {
                var transaktionBiz = mapper.MapToDomainModel(transaktion);
                transaktionenBiz.Add(transaktionBiz);
            }

            return transaktionenBiz;
        }

        public WiederkehrendeTransaktionBiz Update(WiederkehrendeTransaktionBiz transaktionBiz)
        {
            var mapper = new WiederkehrendeTransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            _context.WiederkehrendeTransaktionen.Attach(transaktion);
            var entry = _context.Entry(transaktion);
            entry.State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            return transaktionBiz;
        }

        public WiederkehrendeTransaktionBiz Insert(WiederkehrendeTransaktionBiz transaktionBiz)
        {
            var mapper = new WiederkehrendeTransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            _context.WiederkehrendeTransaktionen.Add(transaktion);
            _context.SaveChanges();

            return transaktionBiz;
        }

        public bool Delete(int id)
        {
            var transaktion = _context.WiederkehrendeTransaktionen.Find(id);

            if (transaktion == null)
                return false;

            _context.WiederkehrendeTransaktionen.Remove(transaktion);
            _context.SaveChanges();

            transaktion = _context.WiederkehrendeTransaktionen.Find(id);

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
