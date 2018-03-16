using FbManager.Models.Containers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Models
{
    public class FacebookUser
    {
        [JsonProperty("id")]
        public string FbId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("locale")]
        public string Locale { get; set; }

        [JsonProperty("birthday")]
        public string Birthday { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        public string PictureUrl { get {
            if (PictureData == null || PictureData.Data == null || String.IsNullOrEmpty(PictureData.Data.Url))
                return "";

            return PictureData.Data.Url; 
        } }

        public IList<FacebookUserAlbum> Albums
        {
            get
            {
                if (AlbumData == null || AlbumData.Data == null || AlbumData.Data.Count < 1)
                    return null;

                return AlbumData.Data.ToList();
            }
        }

        /*
        public IList<FacebookUserFriend> Friends { get { return FriendsData.Data; } }

        [JsonProperty("friends")]
        protected FacebookUserFriendsData FriendsData { get; set; }

         * */


        [JsonProperty("picture")]
        protected FacebookUserPictureData PictureData { get; set; }

        [JsonProperty("albums")]
        protected FacebookUserAlbumData AlbumData { get; set; }
    }
}