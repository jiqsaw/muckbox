using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB
{
    public class ServerVars
    {
        public static string Ip() { 
            return System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString(); 
        }
    }
}
