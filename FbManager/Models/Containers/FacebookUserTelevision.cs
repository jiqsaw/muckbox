using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FbManager.Models.Containers
{
    public class FacebookUserTelevision
    {
        [JsonProperty("data")]
        public IList<FacebookUserInterest> Data { get; set; }
    }
}
