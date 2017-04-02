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
    public class ZukuenftigeTransaktionenController : ODataController
    {
        private ZukuenftigeTransaktionService _zukuenftigeTransaktionService;
        private KategorieService _kategorienService;

        public ZukuenftigeTransaktionenController()
        {
            _zukuenftigeTransaktionService = new ZukuenftigeTransaktionService();
            _kategorienService = new KategorieService();
        }

        [HttpGet]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            var transaktionen = _zukuenftigeTransaktionService.GetAll();
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
            var deleted = _zukuenftigeTransaktionService.Delete(key);
            if (!deleted)
            {
                return NotFound();
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Post(ZukuenftigeTransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insertedTransaktion = _zukuenftigeTransaktionService.Insert(transaktion);
            return Created(insertedTransaktion);
        }

        public IHttpActionResult Put([FromODataUri] int key, ZukuenftigeTransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != transaktion.ZukuenftigeTransaktionId)
            {
                return BadRequest();
            }
            var updatedTransaktion = _zukuenftigeTransaktionService.Update(transaktion);
            return Updated(updatedTransaktion);
        }

    }
}