using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Babylips.Service;
using Babylips.Service.Services;

namespace Babylips.Web.Controllers
{
    public class MyMusicController : BaseAuthController
    {
        public ActionResult Index()
        {
            srvRecord service = new srvRecord();
            var data = service.GetByUserId(session.User.Data.Id);

            if (data == null || data.Count() < 1)
                return RedirectToAction("NoMusic");
            else
                return View(data);
        }

        public ActionResult NoMusic()
        {
            return View();
        }
	}
}