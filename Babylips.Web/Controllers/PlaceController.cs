using Babylips.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class PlaceController : BaseController
    {
        public PartialViewResult Counties(int CityId)
        {

            if (CityId > 0)
            {
                srvCounty service = new srvCounty();
                var model = service.GetAllByCityId(CityId);
                return PartialView(model);
            }

            return PartialView();
        }


    }
}