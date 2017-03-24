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
    public class WiederkehrendeTransaktionenController : ODataController
    {
        private WiederkehrendeTransaktionService _wiederkehrendeTransaktionService;
        private KategorieService _kategorienService;

        public WiederkehrendeTransaktionenController()
        {
            _wiederkehrendeTransaktionService = new WiederkehrendeTransaktionService();
            _kategorienService = new KategorieService();
        }

        [HttpGet]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            var transaktionen = _wiederkehrendeTransaktionService.GetAll();
            return Ok(transaktionen.AsQueryable());
        }

        [EnableQuery]
        public SingleResult<KategorieBiz> GetKategorie([FromODataUri] int key)
        {
            var result = _kategorienService.Get(key);
            return SingleResult.Create(result);
        }

        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var deleted = _wiederkehrendeTransaktionService.Delete(key);
            if (!deleted)
            {
                return NotFound();
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Post(WiederkehrendeTransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insertedTransaktion = _wiederkehrendeTransaktionService.Insert(transaktion);
            return Created(insertedTransaktion);
        }

        public IHttpActionResult Put([FromODataUri] int key, WiederkehrendeTransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != transaktion.WiederkehrendeTransaktionId)
            {
                return BadRequest();
            }
            var updatedTransaktion = _wiederkehrendeTransaktionService.Update(transaktion);
            return Updated(updatedTransaktion);
        }

    }
}