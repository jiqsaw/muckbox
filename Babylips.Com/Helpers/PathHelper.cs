using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB.ExtentionMethods;
using Babylips.Com.Helpers;
using LIB;



namespace Babylips.Com.Helpers.UrlHelperExtensions
{
    public static class Extensions
    {
        

    }
}

namespace Babylips.Com.Helpers
{
    public class PathHelper : LIB.UrlHelper
    {
        public enum Url
        {
            url_Web,
            url_Admin,
            url_Static,
            url_Google_Analytics_AppName,
            url_Google_Analytics_UserName,
            url_Google_Analytics_AppKey,
            url_Google_Analytics_ProfileId,
            url_Google_Analytics_AccountId,
            url_Google_Analytics_Password
        }

        public static string UrlWeb { get { return LIB.Util.GetConfigValue(Url.url_Web.ToString()); } }
        public static string UrlAdmin { get { return LIB.Util.GetConfigValue(Url.url_Admin.ToString()); } }
        public static string UrlStatic { get { return LIB.Util.GetConfigValue(Url.url_Static.ToString()); } }
        public static string Google_Analytics_AppName { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_AppName.ToString()); } }
        public static string Google_Analytics_UserName { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_UserName.ToString()); } }
        public static string Google_Analytics_AppKey { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_AppKey.ToString()); } }
        public static string Google_Analytics_ProfileId { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_ProfileId.ToString()); } }
        public static string Google_Analytics_AccountId { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_AccountId.ToString()); } }
        public static string Google_Analytics_Password { get { return LIB.Util.GetConfigValue(Url.url_Google_Analytics_Password.ToString()); } }

        public static string UrlMuckboxPlayback(string Name, string Surname, string RecordTitle, int RecordId, bool isFullPath = false)
        {
            //muckbox/dinle/mustafa-denizli/4/nasil-guzelmi

            string urlMap = "/muckbox/dinle/{USER_FULLNAME}/{RECORD_ID}/{RECORD_TITLE}";

            urlMap = urlMap.Replace("{USER_FULLNAME}", Name.ToLower() + "-" + Surname.ToLower());
            urlMap = urlMap.Replace("{RECORD_ID}", RecordId.ToString());
            urlMap = urlMap.Replace("{RECORD_TITLE}", RecordTitle);
            urlMap = FormatHelper.URL(urlMap);

            if (isFullPath)
                return UrlWeb + urlMap;

            return urlMap; 
        }


        public static string UrlMuckboxPlaybackShort(int RecordId, bool isFullPath = false)
        {
            //muckbox/dinle/mustafa-denizli/4/nasil-guzelmi 

            string urlMap = "/d/{RECORD_ID}";

            urlMap = urlMap.Replace("{RECORD_ID}", RecordId.ToString());

            if (isFullPath)
                urlMap = UrlWeb + FormatHelper.URL(urlMap);

            return urlMap;
        }

        public class Images
        {

        }
    }
}