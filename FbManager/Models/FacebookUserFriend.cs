using FbManager.Models.Containers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Models
{
    public class FacebookUserFriend
    {
        [JsonProperty("id")]
        public string FbId { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        [JsonProperty("birthday")]
        public string Birthday { get; set; }

        [JsonProperty("picture")]
        protected FacebookUserPictureData PictureData { get; set; }

        [JsonProperty("location")]
        public FacebookUserLocation location { get; set; }

        public string PictureUrl
        {
            get
            {
                if (PictureData == null || PictureData.Data == null || String.IsNullOrEmpty(PictureData.Data.Url))
                    return "";

                return PictureData.Data.Url;
            }

            set
            {
                var pd = new FacebookUserPictureData();
                var fp = new FacebookUserPicture();
                fp.Url = value;

                pd.Data = fp;

                this.PictureData = pd;

            }
        }

        [JsonProperty("television")]
        public FacebookUserTelevision Television { get; set; }

        [JsonProperty("movies")]
        public FacebookUserMovie Movie { get; set; }

        [JsonProperty("music")]
        public FacebookUserMusic Music { get; set; }
   }
}