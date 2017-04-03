using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    /// <summary>
    /// Contains the logic for performing queries on the Transaktion table in the MSSQL Database.
    /// </summary>
    public class TransaktionRepository : IDisposable
    {

        private LarrybookContext _context;

        /// <summary>
        /// Initializes a new instance of the TransaktionRepository class.
        /// </summary>
        public TransaktionRepository()
        {
            _context = new LarrybookContext();
        }

        /// <summary>
        /// Gets all Transaktionen in the database.
        /// </summary>
        /// <returns>A list of all Transaktionen in the database.</returns>
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

        /// <summary>
        /// Updates an exsiting Transaktion.
        /// </summary>
        /// <param name="transaktionBiz">The Transaktion to be updated.</param>
        /// <returns>The updated Transaktion.</returns>
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

        /// <summary>
        /// Inserts a new Transaktion.
        /// </summary>
        /// <param name="transaktionBiz">The Transaktion to be inserted.</param>
        /// <returns>The inserted Transaktion.</returns>
        public TransaktionBiz Insert(TransaktionBiz transaktionBiz)
        {
            var mapper = new TransaktionMapper();
            var transaktion = mapper.MapFromDomainModel(transaktionBiz);

            var transaktionWithId = _context.Transaktionen.Add(transaktion);
            _context.SaveChanges();

            var transaktionBizWithId = mapper.MapToDomainModel(transaktionWithId);
            return transaktionBizWithId;
        }

        /// <summary>
        /// Delete a single Transaktion.
        /// </summary>
        /// <param name="id">The id of the Transaktion that is to be deleted.</param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            var transaktion = _context.Transaktionen.Find(id);

            if (transaktion == null)
                return false;

            _context.Transaktionen.Remove(transaktion);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }

            transaktion = _context.Transaktionen.Find(id);

            if (transaktion == null)
                return true;

            return false;
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
        // ~TransaktionRepository() {
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
