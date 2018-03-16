using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.DB
{
    public interface IBaseEntity
    {
        int Id { get; set; }
        bool IsActive { get; set; }
        bool IsDeleted { get; set; }
        DateTime CreateDate { get; set; }
    }
}