using Babylips.Service.Models;
using Babylips.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class StatsController : Controller
    {
        public ActionResult Index()
        {
            srvStats service = new srvStats();
            var model = service.GetAllData();

            return View(model);
        }
    }
}