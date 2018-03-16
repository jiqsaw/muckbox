using Babylips.Filters;
using Babylips.Web.App_Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Conditions()
        {
            return PartialView();
        }

        public PartialViewResult Privacy()
        {
            return PartialView();
        }

        public PartialViewResult Watch()
        {
            return PartialView();
        }

        public PartialViewResult Survey()
        {
            return PartialView();
        }

    }
}