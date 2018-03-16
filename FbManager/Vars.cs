using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager
{
    public class Vars
    {
        public enum Apps
        {
            Facebook_AppId,
            Facebook_AppImg,
            Facebook_ShareName,
            Facebook_ShareCaption,
            Facebook_ShareDescription,
            Facebook_InviteMsg
        }

        public static string Facebook_AppId { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_AppId.ToString())); } }
        public static string Facebook_AppImg { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_AppImg.ToString())); } }
        public static string Facebook_ShareName { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_ShareName.ToString())); } }
        public static string Facebook_ShareCaption { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_ShareCaption.ToString())); } }
        public static string Facebook_ShareDescription { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_ShareDescription.ToString())); } }
        public static string Facebook_InviteMsg { get { return Convert.ToString(LIB.Util.GetConfigValue(Apps.Facebook_InviteMsg.ToString())); } }
   
    }
}
