﻿using Larrybook.DomainModels;
using Larrybook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;

namespace Larrybook.Controllers
{
    [EnableQuery]
    public class TransaktionenController : ODataController
    {
        private TransaktionService _transaktionService;
        private KategorieService _kategorienService;


        public TransaktionenController()
        {
            _transaktionService = new TransaktionService();
            _kategorienService = new KategorieService();
        }

        [HttpGet]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            var transaktionen = _transaktionService.GetAll();
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
            var deleted = _transaktionService.Delete(key);
            if (!deleted)
            {
                return NotFound();
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Post(TransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insertedTransaktion = _transaktionService.Insert(transaktion);
            return Created(insertedTransaktion);
        }

        public IHttpActionResult Put([FromODataUri] int key, TransaktionBiz transaktion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != transaktion.TransaktionId)
            {
                return BadRequest();
            }
            var updatedTransaktion = _transaktionService.Update(transaktion);
            return Updated(updatedTransaktion);
        }
    }
}