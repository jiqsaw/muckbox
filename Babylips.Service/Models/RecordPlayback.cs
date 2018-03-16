using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.Service.Models
{
    public class RecordPlayback
    {

        public int Id { get; set; }
        public int ByUserId { get; set; }
        public string ByUserName { get; set; }
        public string ByUserLastName { get; set; }
        public string ByUserPicture { get; set; }
        public string RecordTitle { get; set; }
        public string RecordData { get; set; }

    }
}
