using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    /// <summary>
    /// Contains the logic for performing queries on the ZukuenftigeTransaktion table in the MSSQL Database.
    /// </summary>
    public class ZukuenftigeTransaktionRepository : IDisposable
    {
        private LarrybookContext _context;

        /// <summary>
        /// Creates a new instance of the ZukuenftigeTransaktionRepository class.
        /// </summary>
        public ZukuenftigeTransaktionRepository()
        {
            _context = new LarrybookContext();
        }

        /// <summary>
        /// Gets all ZukuenftigeTransaktionen in the database.
        /// </summary>
        /// <returns>A list of ZukuenftigeTransaktionen in the database.</returns>
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

        /// <summary>
        /// Updates a ZukuenftigeTransaktion.
        /// </summary>
        /// <param name="transaktionBiz">The ZukuenftigeTransaktion zu be updated.</param>
        /// <returns>The updated ZukuenftigeTransaktion.</returns>
        public ZukuenftigeTransaktionBiz Update(ZukuenftigeTransaktionBiz transaktionBiz)
        {
            var mapper = new ZukuenftigeTransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            _context.Set<ZukuenftigeTransaktion>().AddOrUpdate(transaktion);
            _context.SaveChanges();

            return transaktionBiz;
        }

        /// <summary>
        /// Inserts a ZukuenftigeTransaktion.
        /// </summary>
        /// <param name="transaktionBiz">The ZukuenftigeTransaktion to be inserted.</param>
        /// <returns>The inserted ZukuenftigeTransaktion.</returns>
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

        /// <summary>
        /// Deletes a ZukuenftigeTransaktion.
        /// </summary>
        /// <param name="id">The id of the ZukuenftigeTransaktion to be deleted.</param>
        /// <returns>A value indicating if the deletion was successful.</returns>
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

        /// <summary>
        /// Get all ZukuenftigeTransaktion which have a StartDatum in the future.
        /// </summary>
        /// <returns>A list of oudated ZukuenftigeTransaktion.</returns>
        public List<ZukuenftigeTransaktionBiz> GetOutdated()
        {
            var mapper = new ZukuenftigeTransaktionMapper();

            var dateNow = DateTime.Now;
            var transaktionen = _context.ZukuenftigeTransaktionen.Where(x => x.StartDatum.CompareTo(dateNow) < 1).ToList();
            var mappedTransaktionen = new List<ZukuenftigeTransaktionBiz>();

            foreach (var transaktion in transaktionen)
            {
                mappedTransaktionen.Add(mapper.MapToDomainModel(transaktion));
            }

            return mappedTransaktionen;
        }


        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        /// <summary> 
        /// Release resources.
        /// </summary> 
        /// <param name="disposing">If <c>true</c>, the method has been called directly or indirectly by a user's code. Managed and unmanaged resources
        /// can be disposed. If <c>false</c>, the method has been called by the runtime from inside the finalizer and you should not reference 
        /// other objects. Only unmanaged resources can be disposed.</param> 
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
        /// <summary> 
        /// Release all managed and unmanaged resources.
        /// </summary> 
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
