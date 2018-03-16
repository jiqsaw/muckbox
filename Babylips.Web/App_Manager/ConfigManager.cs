using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LIB.ExtentionMethods;
using System.Configuration;

namespace Babylips.Web.App_Manager
{
    public class ConfigManager
    {

        private static ConfigManager _ConfigManager;

        private ConfigManager() { }

        public static ConfigManager GetInstance()
        {
            if (_ConfigManager == null)
                _ConfigManager = new ConfigManager();
            return _ConfigManager;
        }

        private object GET(ConfigName ConfigName) { return ConfigurationManager.AppSettings[ConfigName.ToString()]; }
        public object GetManual(ConfigName ConfigName) { return ConfigurationManager.AppSettings[ConfigName.ToString()]; }

        public enum ConfigName
        {

            Facebook_IncludeFriends,
            Facebook_PageAppTabUrl,
            Facebook_LandingPage,

            Twitter_ShareMessage,

            FbPageUrl,
            InstagramPageUrl,

            GAEnabled

            /* Paths & Urls in Com.Helpers.UrlHelper */
        }

        public bool Facebook_IncludeFriends { get { return Convert.ToBoolean(GET(ConfigName.Facebook_IncludeFriends)); } }

        public string Twitter_ShareMessage { get { return GET(ConfigName.Twitter_ShareMessage).ToString(); } }

        public string FbPageUrl { get { return GET(ConfigName.FbPageUrl).ToString(); } }
        public string InstagramPageUrl { get { return GET(ConfigName.InstagramPageUrl).ToString(); } }


        public bool GAEnabled { get { return Convert.ToBoolean(GET(ConfigName.GAEnabled)); } }
    }
}