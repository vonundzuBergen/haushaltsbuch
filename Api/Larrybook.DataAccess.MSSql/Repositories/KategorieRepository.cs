using Larrybook.DataAccess.MSSql.Mapping;
using Larrybook.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Repositories
{
    public class KategorieRepository : IDisposable
    {
        private LarrybookContext _context;

        public KategorieRepository()
        {
            _context = new LarrybookContext();
        }

        /// <summary>
        /// Hallo
        /// </summary>
        /// <returns></returns>
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
        /// Diese Methode macht
        /// </summary>
        /// <param name="kategorieBiz"></param>
        /// <returns></returns>
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
