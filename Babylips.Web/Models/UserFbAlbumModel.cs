using FbManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Babylips.Web.App_Manager;

namespace Babylips.Web.Models
{
    public class UserFbAlbumModel : FacebookUserAlbum
    { 
        public string CoverPhotoUrl
        {
            get
            {
                return FbManager.Helpers.UrlHelper.GetAlbumPhotoCoverUrl(this.CoverPhoto, SessionManager.GetInstance().FbAccessToken);
            }
        }

    }
}