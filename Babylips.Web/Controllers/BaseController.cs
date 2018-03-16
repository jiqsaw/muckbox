using Babylips.Web.App_Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class BaseController : Controller
    {
        protected SessionManager session { get { return SessionManager.GetInstance(); } }

        protected ConfigManager config { get { return ConfigManager.GetInstance(); } }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (HttpContext.Request.Browser.IsMobileDevice)
            {
                Response.Redirect("~/m");
            }

            ViewBag.IsMobile = Request.Browser.IsMobileDevice;
        }

	}
}