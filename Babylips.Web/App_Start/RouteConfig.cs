using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Babylips.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Muckbox", "muckbox", new { controller = "Mechanic", action = "Index" });
            routes.MapRoute("HowTo", "nasil-oynanir", new { controller = "HowTo", action = "Index" });
            routes.MapRoute("Rewards", "oduller", new { controller = "Rewards", action = "Index" });
            routes.MapRoute("MyMusic", "muziklerim", new { controller = "MyMusic", action = "Index" });
            routes.MapRoute("Conditions", "katilim-kosullari", new { controller = "Home", action = "Conditions" });
            routes.MapRoute("Privacy", "gizlilik", new { controller = "Home", action = "Privacy" });
            routes.MapRoute("Watch", "izle", new { controller = "Home", action = "Watch" });
            routes.MapRoute("Mobile", "m", new { controller = "Mobile", action = "Index" });


            routes.MapRoute(
                "MuckboxPlaybackShort",
                "d/{RecordId}",
                new { controller = "Playback", action = "Index" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            //"muckbox/dinle/{USER_FULLNAME}/{RECORD_ID}/{RECORD_TITLE}";
            routes.MapRoute(
                "MuckboxPlayback",
                "muckbox/dinle/{UserFullName}/{RecordId}/{RecordTitle}",
                new { controller = "Playback", action = "Index" }
            );

        }
    }
}
