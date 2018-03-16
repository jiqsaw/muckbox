using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Models.Containers
{
    public class FacebookUserAlbumData
    {
        [JsonProperty("data")]
        public  IList<FacebookUserAlbum> Data { get; set; }
    }
}
 