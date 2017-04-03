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
    /// Contains the logic for performing queries on the Kategorie table in the MSSQL Database.
    /// </summary>
    public class KategorieRepository : IDisposable
    {
        private LarrybookContext _context;

        /// <summary>
        /// Creates a new instance of the KategorieRepository class.
        /// </summary>
        public KategorieRepository()
        {
            _context = new LarrybookContext();
        }

        /// <summary>
        /// Gets all Kategorien in the database.
        /// </summary>
        /// <returns>A List of all KategorieBiz in the database.</returns>
        public List<KategorieBiz> GetAll()
        {
            var kategorien = _context.Kategorien.ToList();
            var kategorienBiz = new List<KategorieBiz>();
            var mapper = new KategorieMapper();

            foreach (var kategorie in kategorien)
            {
                var kategorieBiz = mapper.MapToDomainModel(kategorie);
                kategorienBiz.Add(kategorieBiz);
            }

            return kategorienBiz;
        }

        /// <summary>
        /// Updates a Kategorie.
        /// </summary>
        /// <param name="kategorieBiz">The Kategorie to be updated.</param>
        /// <returns>The updated Kategorie.,/returns>
        public KategorieBiz Update(KategorieBiz kategorieBiz)
        {
            var mapper = new KategorieMapper();
            var kategorie = mapper.MapFromDomainModel(kategorieBiz);

            _context.Kategorien.Attach(kategorie);
            var entry = _context.Entry(kategorie);
            entry.State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            return kategorieBiz;
        }

        /// <summary>
        /// Inserts a new Kategorie.
        /// </summary>
        /// <param name="kategorieBiz">The Kategorie to be inserted.</param>
        /// <returns>The inserted Kategorie.</returns>
        public KategorieBiz Insert(KategorieBiz kategorieBiz)
        {
            var mapper = new KategorieMapper();
            var kategorie = mapper.MapFromDomainModel(kategorieBiz);

            var kategorieWithId = _context.Kategorien.Add(kategorie);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw;
            }


            var kategorieBizWithId = mapper.MapToDomainModel(kategorieWithId);

            return kategorieBizWithId;
        }

        /// <summary>
        /// Deletes a Kategorie.
        /// </summary>
        /// <param name="id">The id of the Kategorie to be deleted.</param>
        /// <returns>A value indicating if the deletion was successful.</returns>
        public bool Delete(int id)
        {
            var kategorie = _context.Kategorien.Find(id);

            if (kategorie == null)
                return false;

            _context.Kategorien.Remove(kategorie);
            _context.SaveChanges();

            kategorie = _context.Kategorien.Find(id);

            if (kategorie == null)
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
        // ~KategorieRepository() {
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
