using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Models
{
    public class FacebookUserPicture
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("is_silhouette")]
        public bool IsSilhouette { get; set; }
    }
}
