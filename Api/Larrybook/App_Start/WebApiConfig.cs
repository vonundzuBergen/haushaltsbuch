using Larrybook.DomainModels;
using Microsoft.OData.Edm;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData.Batch;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace Larrybook
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //config.Formatters.JsonFormatter.SupportedMediaTypes
            //    .Add(new MediaTypeHeaderValue("text/html"));

            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(
             new IsoDateTimeConverter());

            //Web API routes
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            ODataModelBuilder builder = new ODataConventionModelBuilder();

            config.MapODataServiceRoute("odata", "api", GetEdmModel(), new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer));
            config.EnsureInitialized();
        }

        private static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.Namespace = "Demos";
            builder.ContainerName = "DefaultContainer";
            var transaktionen = builder.EntitySet<TransaktionBiz>("Transaktionen");
            var kategorien = builder.EntitySet<KategorieBiz>("Kategorien");
            var wiederkehrendeTransaktionen = builder.EntitySet<WiederkehrendeTransaktionBiz>("WiederkehrendeTransaktionen");

            //transaktionen.HasRequiredBinding(x => x.Kategorie, kategorien);
            var edmModel = builder.GetEdmModel();
            return edmModel;
        }
    }
}
