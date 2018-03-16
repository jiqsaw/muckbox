using Babylips.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class PlaybackController : BaseController
    {
        public ActionResult Index(int RecordId)
        {
            srvRecord service = new srvRecord();
            var model = service.GetPlayback(RecordId);
            if (model == null)
                return RedirectToAction("Index", "Home");

            return View(model);
        }
	}
}