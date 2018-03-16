using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Babylips.Web.Models
{
    public class HeaderModel
    {
        public enum pageItems
	    {
            None,
            Anasayfa,
            NasilOynanir, 
	        Oduller,
            Muziklerim,
            Dinle
	    }

        public pageItems pageItem { get; set; }

    }
}