using Larrybook.DomainModels;
using Larrybook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.OData;

namespace Larrybook.Controllers
{   
    public class KategorienController : ODataController
    {
        private KategorieService _kategorieService;

        public KategorienController()
        {
            _kategorieService = new KategorieService();
        }

        [HttpGet]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            var kategorien = _kategorieService.GetAll();

            return Ok(kategorien.AsQueryable());
        }

        public IHttpActionResult Post(KategorieBiz kategorieBiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insertedKategorie =_kategorieService.Insert(kategorieBiz);
            return Created(insertedKategorie);
        }

        //replaces the entire entity
        public IHttpActionResult Put([FromODataUri] int key, KategorieBiz kategorie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != kategorie.KategorieId)
            {
                return BadRequest();
            }
            var updatedKategorie = _kategorieService.Update(kategorie); 
            return Updated(updatedKategorie);
        }

        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var deleted = _kategorieService.Delete(key);
            if (!deleted)
            {
                return NotFound();
            }
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}