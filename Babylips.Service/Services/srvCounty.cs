using Babylips.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.Service.Services
{
    public class srvCounty : BaseService<County>, IBaseService<County>
    {

        public IEnumerable<County> GetAllByCityId(int CityId)
        {
            return c.Counties.Where(m => m.CityId == CityId && m.IsActive == true && m.IsDeleted == false);
        }

    }
}
