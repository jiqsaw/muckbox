using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Helpers
{
    public class UrlHelper
    {
        private  static string tmpUrlAlbumCover = "https://graph.facebook.com/[COVERPHOTOID]/picture?access_token=[ACCESSTOKEN]";

        public static string GetAlbumPhotoCoverUrl(string CoverPhotoId, string AccessToken)
        {

            return tmpUrlAlbumCover.Replace("[COVERPHOTOID]", CoverPhotoId).Replace("[ACCESSTOKEN]", AccessToken);
        }

    }
}
